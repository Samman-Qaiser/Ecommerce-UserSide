import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseconfig';
import { loginSuccess, setGuestUser, logout } from '../redux/authSlice';
import { userService } from '../services/userService';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log("🔐 Firebase user detected:", firebaseUser.uid);
        // ✅ Firebase authenticated user
        try {
          // 🔗 STEP 1: Check for guest session FIRST
          const guestUserId = localStorage.getItem("guestUserId");
          
          if (guestUserId) {
            console.log("🔗 Found guest session during auth, merging data...");
            console.log("Guest ID:", guestUserId);
            console.log("Auth UID:", firebaseUser.uid);
            
            try {
              // Convert guest to auth user (merges addresses, orders, etc.)
              const mergedUser = await userService.convertGuestToAuthUser(
                guestUserId,
                firebaseUser.uid,
                {
                  email: firebaseUser.email,
                  fullName: firebaseUser.displayName || "",
                  photoURL: firebaseUser.photoURL || "",
                }
              );
              
              console.log("✅ Guest data merged successfully:", mergedUser);
              
              // ✅ IMPORTANT: Dispatch the merged user immediately
              if (mergedUser) {
                dispatch(loginSuccess(mergedUser));
                return; // Exit early - we already dispatched
              }
              
            } catch (mergeError) {
              console.warn("⚠️ Guest merge failed (non-critical):", mergeError);
              // Continue to normal flow
            }
          }

          // 🔗 STEP 2: Get final user data (only if merge didn't happen)
          let userData = await userService.getUserById(firebaseUser.uid);
          
          // User document nahi mila to create karo
          if (!userData) {
            console.warn("User document not found in Firestore, creating...");
            userData = await userService.createOrUpdateUser(firebaseUser.uid, {
              email: firebaseUser.email,
              fullName: firebaseUser.displayName || "",
              photoURL: firebaseUser.photoURL || "",
              phoneNumber: firebaseUser.phoneNumber || "",
              isGuest: false,
            });
          }

          console.log("📤 Dispatching loginSuccess with userData:", userData);
          // ✅ Authenticated user ke liye loginSuccess
          dispatch(loginSuccess(userData));

        } catch (error) {
          console.error("❌ Error fetching user data:", error);
          // Fallback to Firebase data
          const fallbackData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            fullName: firebaseUser.displayName || "",
            photoURL: firebaseUser.photoURL || "",
            isGuest: false,
          };
          console.log("📤 Dispatching loginSuccess with fallback data:", fallbackData);
          dispatch(loginSuccess(fallbackData));
        }
      } else {
        console.log("👻 No Firebase user, checking for guest...");
        // ✅ No Firebase user - check for guest
        const guestUserId = localStorage.getItem("guestUserId");
        
        if (guestUserId) {
          try {
            const guestData = await userService.getUserById(guestUserId);
            
            if (guestData && guestData.isGuest) {
              console.log("👤 Loading guest user:", guestData);
              // ✅ Guest user ke liye setGuestUser use karo
              dispatch(setGuestUser(guestData));
            } else {
              // Invalid guest data
              console.warn("⚠️ Guest user not found or invalid, clearing session");
              localStorage.removeItem("guestUserId");
              dispatch(logout());
            }
          } catch (error) {
            console.error("❌ Error loading guest user:", error);
            localStorage.removeItem("guestUserId");
            dispatch(logout());
          }
        } else {
          console.log("🚪 No user at all, logging out");
          // No user at all
          dispatch(logout());
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;