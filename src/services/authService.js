import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebaseconfig";
import { userService } from "../services/userService";


class AuthService {
  constructor() {
    this.googleProvider = new GoogleAuthProvider();
    this.facebookProvider = new FacebookAuthProvider();
  }
async linkGuestToAuthUser(guestId) {
  try {
    const currentUser = this.getCurrentUser();

    if (!currentUser) {
      throw new Error("No authenticated user found");
    }

    console.log("🔗 Linking guest to auth user...");
    console.log("Guest ID:", guestId);
    console.log("Auth UID:", currentUser.uid);

    const userData = await userService.convertGuestToAuthUser(
      guestId,
      currentUser.uid,
      {
        email: currentUser.email,
        fullName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      }
    );

    console.log("✅ Guest linked successfully");
    return userData;
  } catch (error) {
    console.error("❌ Error linking guest user:", error);
    // Don't throw - just log. Guest linking is optional.
    return null;
  }
}

  async signUp({ email, password, fullName, phoneNumber = "" }) {
    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Update display name
      if (fullName) {
        await updateProfile(user, { displayName: fullName });
      }

      // Create Firestore user document
      const userData = await userService.createOrUpdateUser(user.uid, {
        fullName: fullName || "",
        email: user.email,
        phoneNumber: phoneNumber || "",
        photoURL: user.photoURL || "",
        isGuest: false,
      });

      return {
        uid: user.uid,
        email: user.email,
        displayName: fullName,
        ...userData,
      };
    } catch (error) {
      console.error("Sign up error:", error);
      throw this.handleAuthError(error);
    }
  }

 
  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Get user data from Firestore
      let userData = await userService.getUserById(user.uid);

      // If user doesn't exist in Firestore, create it
      if (!userData) {
        userData = await userService.createOrUpdateUser(user.uid, {
          fullName: user.displayName || "",
          email: user.email,
          photoURL: user.photoURL || "",
          isGuest: false,
        });
      }

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        ...userData,
      };
    } catch (error) {
      console.error("Sign in error:", error);
      throw this.handleAuthError(error);
    }
  }

 
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, this.googleProvider);
      const user = result.user;

      // Create or update user in Firestore
      const userData = await userService.createOrUpdateUser(user.uid, {
        fullName: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "",
        isGuest: false,
      });

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        ...userData,
      };
    } catch (error) {
      console.error("Google sign in error:", error);
      throw this.handleAuthError(error);
    }
  }


  async signInWithFacebook() {
    try {
      const result = await signInWithPopup(auth, this.facebookProvider);
      const user = result.user;

      const userData = await userService.createOrUpdateUser(user.uid, {
        fullName: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "",
        isGuest: false,
      });

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        ...userData,
      };
    } catch (error) {
      console.error("Facebook sign in error:", error);
      throw this.handleAuthError(error);
    }
  }


  async signOut() {
    try {
      await signOut(auth);
      localStorage.removeItem("guestUserId");
    } catch (error) {
      console.error("Sign out error:", error);
      throw new Error("Failed to sign out");
    }
  }


  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Password reset error:", error);
      throw this.handleAuthError(error);
    }
  }

 
  getCurrentUser() {
    return auth.currentUser;
  }

 
  onAuthStateChange(callback) {
    return onAuthStateChanged(auth, callback);
  }

 
  async linkGuestToAuthUser(guestId) {
    try {
      const currentUser = this.getCurrentUser();

      if (!currentUser) {
        throw new Error("No authenticated user found");
      }

      const userData = await userService.convertGuestToAuthUser(
        guestId,
        currentUser.uid,
        {
          email: currentUser.email,
          fullName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }
      );

      return userData;
    } catch (error) {
      console.error("Error linking guest user:", error);
      throw new Error(`Failed to link accounts: ${error.message}`);
    }
  }


  handleAuthError(error) {
    const errorMessages = {
      "auth/email-already-in-use":
        "This email is already registered. Please sign in instead.",
      "auth/invalid-email": "Invalid email address.",
      "auth/operation-not-allowed": "Operation not allowed.",
      "auth/weak-password": "Password should be at least 6 characters.",
      "auth/user-disabled": "This account has been disabled.",
      "auth/user-not-found": "No account found with this email.",
      "auth/wrong-password": "Incorrect password.",
      "auth/invalid-credential": "Invalid email or password.",
      "auth/too-many-requests":
        "Too many attempts. Please try again later.",
      "auth/network-request-failed":
        "Network error. Please check your connection.",
      "auth/popup-closed-by-user": "Sign-in popup was closed.",
    };

    const message =
      errorMessages[error.code] || "An error occurred. Please try again.";
    return new Error(message);
  }
}

export const authService = new AuthService();
export default authService;