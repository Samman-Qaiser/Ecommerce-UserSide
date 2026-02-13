import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout ,setGuestUser } from "../redux/authSlice";
import { authService } from "../services/authService";
import { userService } from "../services/userService";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    const unsubscribe = authService.onAuthStateChange(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Authenticated user
          const userData = await userService.getUserById(firebaseUser.uid);

          if (userData) {
            dispatch(loginSuccess({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              ...userData,
            }));
          } else {
            console.warn("User not found in Firestore, logging out...");
            await authService.signOut();
            dispatch(logout());
          }
        } else {
          // No Firebase user - check guest
          const guestId = localStorage.getItem("guestUserId");

          if (guestId) {
            const guestUser = await userService.getUserById(guestId);
            if (guestUser && guestUser.isGuest) {
              // ✅ Use setGuestUser for guest
              dispatch(setGuestUser(guestUser));
            } else {
              console.warn("Guest user not found, clearing session...");
              localStorage.removeItem("guestUserId");
              dispatch(logout());
            }
          } else {
            dispatch(logout());
          }
        }
      } catch (err) {
        console.error("Auth state change error:", err);
        setError(err.message);
        dispatch(logout());
        localStorage.removeItem("guestUserId");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const createGuestUser = async (guestData) => {
    try {
      setError(null);
      setLoading(true);

      const guestUser = await userService.createGuestUser(guestData);
      // ✅ Use setGuestUser instead of loginSuccess
      dispatch(setGuestUser(guestUser));

      return guestUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const signUp = async (userData) => {
    try {
      setError(null);
      setLoading(true);

      const user = await authService.signUp(userData);
      dispatch(loginSuccess(user));

      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

const signIn = async (email, password) => {
  try {
    setError(null);
    setLoading(true);

    const user = await authService.signIn(email, password);

    // ✅ Check for guest user to merge
    const guestId = localStorage.getItem("guestUserId");
    if (guestId) {
      console.log("🔗 Found guest session, attempting to link...");
      try {
        await authService.linkGuestToAuthUser(guestId);
        console.log("✅ Guest data linked successfully");
      } catch (linkError) {
        console.warn("⚠️ Guest link failed (non-critical):", linkError);
        // Continue anyway - user is logged in
      }
    }

    dispatch(loginSuccess(user));
    return user;
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};

const signInWithGoogle = async () => {
  try {
    setError(null);
    setLoading(true);

    const user = await authService.signInWithGoogle();

    const guestId = localStorage.getItem("guestUserId");
    if (guestId) {
      console.log("🔗 Found guest session, attempting to link...");
      try {
        await authService.linkGuestToAuthUser(guestId);
        console.log("✅ Guest data linked successfully");
      } catch (linkError) {
        console.warn("⚠️ Guest link failed (non-critical):", linkError);
      }
    }

    dispatch(loginSuccess(user));
    return user;
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};

  const signInWithFacebook = async () => {
    try {
      setError(null);
      setLoading(true);

      const user = await authService.signInWithFacebook();

      const guestId = localStorage.getItem("guestUserId");
      if (guestId) {
        try {
          await authService.linkGuestToAuthUser(guestId);
        } catch (linkError) {
          console.warn("Guest link failed:", linkError);
        }
      }

      dispatch(loginSuccess(user));
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const signOutUser = async () => {
    try {
      setError(null);
      await authService.signOut();
      dispatch(logout());
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const resetPassword = async (email) => {
    try {
      setError(null);
      await authService.resetPassword(email);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    signUp,
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    createGuestUser,
    signOut: signOutUser,
    resetPassword,
    loading,
    error,
    setError,
  };
};