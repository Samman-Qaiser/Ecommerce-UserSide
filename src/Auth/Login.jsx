// AuthPage.jsx
import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Firebase authentication will go here
      // if (isLogin) {
      //   await signInWithEmailAndPassword(auth, formData.email, formData.password);
      // } else {
      //   await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      // }

      // Create user object
      const userData = {
        uid: "user_" + Date.now(),
        name: formData.name || formData.email.split("@")[0],
        email: formData.email,
        createdAt: new Date().toISOString(),
      };

      console.log("Auth Success:", {
        action: isLogin ? "login" : "signup",
        userData,
      });

      // Dispatch to Redux
      dispatch(loginSuccess(userData));

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect to home or dashboard
      navigate("/");
    } catch (err) {
      console.error("Auth error:", err);
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      // TODO: Firebase Google auth will go here
      // const provider = new GoogleAuthProvider();
      // const result = await signInWithPopup(auth, provider);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData = {
        uid: "google_user_" + Date.now(),
        name: "Google User",
        email: "user@gmail.com",
        createdAt: new Date().toISOString(),
      };

      dispatch(loginSuccess(userData));
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
    } catch (err) {
      console.error("Google auth error:", err);
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setError("");
    setLoading(true);

    try {
      // TODO: Firebase Facebook auth will go here
      // const provider = new FacebookAuthProvider();
      // const result = await signInWithPopup(auth, provider);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData = {
        uid: "fb_user_" + Date.now(),
        name: "Facebook User",
        email: "user@facebook.com",
        createdAt: new Date().toISOString(),
      };

      dispatch(loginSuccess(userData));
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
    } catch (err) {
      console.error("Facebook auth error:", err);
      setError("Facebook login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fafafa] p-6 font-sans">
      <div className="w-full max-w-112.5 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        {/* Top Accent Bar */}
        <div className="h-1.5 w-full" style={{ backgroundColor: "#732D92" }} />

        <div className="p-8 sm:p-10">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm text-slate-500 mt-2 font-light">
              {isLogin
                ? "Login to access your ethnic collection"
                : "Join us for an exclusive shopping experience"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="space-y-1.5">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Ayesha Khan"
                    className="pl-10 h-11 border-slate-200 focus-visible:ring-0 focus:border-[#732D92] rounded-lg transition-all"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="email@example.com"
                  className="pl-10 h-11 border-slate-200 focus-visible:ring-0 focus:border-[#732D92] rounded-lg transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-11 border-slate-200 focus-visible:ring-0 focus:border-[#732D92] rounded-lg transition-all"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-[11px] font-semibold text-[#732D92] hover:opacity-80 transition-opacity"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="outline"
              disabled={loading}
              className="w-full h-11 border border-black rounded-none font-medium transition-all active:scale-                    [0.98] shadow-md shadow-purple-100 mt-2"
            >
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Sign In"
                  : "Create Account"}
              {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>

          {/* Social Login */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <span className="relative px-4 text-[10px] font-bold text-slate-300 bg-white uppercase tracking-                [0.2em] block text-center">
              Or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              variant="outline"
              className="h-10 border-slate-200 text-xs font-semibold hover:bg-slate-50 rounded-lg"
            >
              Google
            </Button>
            <Button
              type="button"
              onClick={handleFacebookLogin}
              disabled={loading}
              variant="outline"
              className="h-10 border-slate-200 text-xs font-semibold hover:bg-slate-50 rounded-lg"
            >
              Facebook
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setFormData({ name: "", email: "", password: "" });
                }}
                className="ml-1.5 font-bold hover:underline transition-all"
              >
                {isLogin ? "Register Now" : "Login Here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
