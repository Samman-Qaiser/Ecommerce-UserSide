import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";

class UserService {
  constructor() {
    this.collectionName = "users";
  }

  generateGuestId() {
    return `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async createOrUpdateUser(uid, userData) {
    try {
      const userRef = doc(db, this.collectionName, uid);
      const userSnap = await getDoc(userRef);

      const timestamp = serverTimestamp();

      if (userSnap.exists()) {
        await updateDoc(userRef, {
          ...userData,
          updatedAt: timestamp,
        });

        return { uid, ...userSnap.data(), ...userData };
      } else {
        const newUser = {
          uid,
          fullName: userData.fullName || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
          photoURL: userData.photoURL || "",
          addresses: userData.addresses || [],
          isGuest: userData.isGuest || false,
          createdAt: timestamp,
          updatedAt: timestamp,
        };

        await setDoc(userRef, newUser);
        return newUser;
      }
    } catch (error) {
      console.error("Error creating/updating user:", error);
      throw new Error(`Failed to create/update user: ${error.message}`);
    }
  }

  async createGuestUser(guestData) {
    try {
      // ✅ Check if email already exists (authenticated OR guest)
      const existingUser = await this.getUserByEmail(guestData.email);
      
      if (existingUser) {
        console.log("⚠️ User with this email already exists");
        
        // ✅ Case 1: Email belongs to authenticated user
        if (!existingUser.isGuest) {
          console.log("❌ Cannot create guest - email belongs to authenticated account");
          throw new Error("This email is already registered. Please login instead.");
        }
        
        // ✅ Case 2: Email belongs to another guest - update that guest
        console.log("📝 Updating existing guest user...");
        
        if (guestData.address) {
          const newAddress = {
            id: `addr_${Date.now()}`,
            ...guestData.address,
            isDefault: true,
          };
          await this.addAddress(existingUser.uid, newAddress);
        }
        
        await updateDoc(doc(db, this.collectionName, existingUser.uid), {
          fullName: guestData.fullName || existingUser.fullName,
          phoneNumber: guestData.phoneNumber || existingUser.phoneNumber,
          updatedAt: serverTimestamp(),
        });
        
        // Store this guest ID
        localStorage.setItem("guestUserId", existingUser.uid);
        
        // Return updated user
        const updatedUser = await this.getUserById(existingUser.uid);
        return updatedUser;
      }

      // ✅ Email doesn't exist - create new guest
      console.log("✅ Creating new guest user...");
      const guestId = this.generateGuestId();

      const guestUser = {
        uid: guestId,
        fullName: guestData.fullName,
        email: guestData.email,
        phoneNumber: guestData.phoneNumber || "",
        addresses: guestData.address
          ? [
              {
                id: `addr_${Date.now()}`,
                ...guestData.address,
                isDefault: true,
              },
            ]
          : [],
        isGuest: true,
        photoURL: "",
      };

      const createdUser = await this.createOrUpdateUser(guestId, guestUser);
      localStorage.setItem("guestUserId", guestId);

      return createdUser;
    } catch (error) {
      console.error("Error creating guest user:", error);
      throw error; // Preserve original error
    }
  }

async convertGuestToAuthUser(guestId, authUid, authData = {}) {
  try {
    console.log("🔄 Converting guest to authenticated user...");
    console.log("Guest ID:", guestId);
    console.log("Auth UID:", authUid);
    console.log("Auth Email:", authData.email);

    // ✅ Get guest data first
    const guestRef = doc(db, this.collectionName, guestId);
    const guestSnap = await getDoc(guestRef);

    if (!guestSnap.exists()) {
      console.warn("⚠️ Guest user not found, skipping conversion");
      return null;
    }

    const guestData = guestSnap.data();
    console.log("Guest Data:", guestData);

    // ✅ Check if authenticated user document already exists
    const authUserRef = doc(db, this.collectionName, authUid);
    const authUserSnap = await getDoc(authUserRef);

    if (authUserSnap.exists()) {
      console.log("✅ Auth user document exists, merging guest data...");
      
      // Merge addresses
      if (guestData.addresses && guestData.addresses.length > 0) {
        for (const address of guestData.addresses) {
          await this.addAddress(authUid, address);
        }
      }
      
      // Merge orders if any (legacy - from user document)
      if (guestData.orders && guestData.orders.length > 0) {
        await updateDoc(authUserRef, {
          orders: arrayUnion(...guestData.orders),
          updatedAt: serverTimestamp(),
        });
      }
      
      // Update basic info if missing
      const updates = {};
      if (!authUserSnap.data().fullName && guestData.fullName) {
        updates.fullName = guestData.fullName;
      }
      if (!authUserSnap.data().phoneNumber && guestData.phoneNumber) {
        updates.phoneNumber = guestData.phoneNumber;
      }
      
      if (Object.keys(updates).length > 0) {
        await updateDoc(authUserRef, {
          ...updates,
          updatedAt: serverTimestamp(),
        });
      }

      // 🔥 NEW: Migrate orders from orders collection
      try {
        // Dynamic import to avoid circular dependency
        const { orderService } = await import("../services/ordersService");
        await orderService.updateOrdersUserId(guestId, authUid);
        console.log("✅ Orders migrated from guest to auth user");
      } catch (orderError) {
        console.warn("⚠️ Order migration failed :", orderError);
      }
      
      // Delete guest document
      await deleteDoc(guestRef);
      localStorage.removeItem("guestUserId");
      
      console.log("✅ Guest data merged successfully");
      return await this.getUserById(authUid);
    }

    // ✅ Auth user doesn't exist - convert guest document
    console.log("📝 Creating auth user from guest data...");
    
    const authUser = {
      ...guestData,
      uid: authUid,
      isGuest: false,
      email: authData.email || guestData.email,
      fullName: authData.fullName || guestData.fullName,
      photoURL: authData.photoURL || guestData.photoURL || "",
      convertedFrom: guestId,
      convertedAt: serverTimestamp(),
    };

    await this.createOrUpdateUser(authUid, authUser);

    // 🔥 NEW: Migrate orders from orders collection
    try {
      const { orderService } = await import("../services/ordersService");
      await orderService.updateOrdersUserId(guestId, authUid);
      console.log("✅ Orders migrated from guest to auth user");
    } catch (orderError) {
      console.warn("⚠️ Order migration failed (non-critical):", orderError);
    }
    
    // Delete guest document
    await deleteDoc(guestRef);
    localStorage.removeItem("guestUserId");

    console.log("✅ Guest converted to auth user successfully");
    return authUser;
  } catch (error) {
    console.error("❌ Error converting guest to auth user:", error);
    throw new Error(`Failed to convert guest user: ${error.message}`);
  }
}

  async getUserById(uid) {
    try {
      if (!uid) return null;

      const userRef = doc(db, this.collectionName, uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return { uid, ...userSnap.data() };
      }

      return null;
    } catch (error) {
      console.error("Error getting user:", error);
      throw new Error(`Failed to get user: ${error.message}`);
    }
  }

  async getUserByEmail(email) {
    try {
      if (!email) return null;
      
      const usersRef = collection(db, this.collectionName);
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        return { uid: userDoc.id, ...userDoc.data() };
      }

      return null;
    } catch (error) {
      console.error("Error getting user by email:", error);
      throw new Error(`Failed to get user by email: ${error.message}`);
    }
  }

  async addAddress(uid, address) {
    try {
      const userRef = doc(db, this.collectionName, uid);
      
      // Check if user exists first
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        throw new Error("User not found");
      }
      
      const addressWithId = {
        id: address.id || `addr_${Date.now()}`,
        ...address,
        createdAt: address.createdAt || new Date().toISOString(),
      };

      await updateDoc(userRef, {
        addresses: arrayUnion(addressWithId),
        updatedAt: serverTimestamp(),
      });

      return addressWithId;
    } catch (error) {
      console.error("Error adding address:", error);
      throw new Error(`Failed to add address: ${error.message}`);
    }
  }

  async updateUserProfile(uid, updates) {
    try {
      const userRef = doc(db, this.collectionName, uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw new Error(`Failed to update profile: ${error.message}`);
    }
  }

  async linkOrderToUser(uid, orderId) {
    try {
      const userRef = doc(db, this.collectionName, uid);
      await updateDoc(userRef, {
        orders: arrayUnion(orderId),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error linking order:", error);
      throw new Error(`Failed to link order: ${error.message}`);
    }
  }

  async emailExists(email) {
    try {
      const user = await this.getUserByEmail(email);
      return user !== null;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  }
}

export const userService = new UserService();
export default userService;