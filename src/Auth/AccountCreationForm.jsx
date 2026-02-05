// AccountCreationForm.jsx
import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

const AccountCreationForm = ({ orderId, orderData, onSuccess }) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name:  "",
    email:  "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create user object
      const userData = {
        uid: "user_" + Date.now(), // Temporary ID, will be replaced with Firebase UID
        name: formData.name,
        email: formData.email,
        createdAt: new Date().toISOString(),
        orders: [orderId], // Link this order to user
      };

      // TODO: Firebase integration will go here
      // const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      // userData.uid = userCredential.user.uid;

      console.log("Form Data:", {
        action: isLogin ? "login" : "signup",
        ...formData,
        orderId,
      });

      // Dispatch Redux action to save user in store
      dispatch(loginSuccess(userData));


      onSuccess();
    } catch (err) {
      console.error("Auth error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Top Accent Bar */}
      <div className="h-1.5 w-full" style={{ backgroundColor: "#732D92" }} />

      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            {isLogin ? "Welcome Back!" : "Create Your Account"}
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            {isLogin
              ? "Login to view your order"
              : "Track your order and enjoy exclusive benefits"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Enter Your Name"
                  className="pl-10 h-11 border-slate-200 focus-visible:ring-0 focus:border-[#732D92] rounded-lg"
                  required
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
                className="pl-10 h-11 border-slate-200 focus-visible:ring-0  rounded-lg"
                required
                // disabled={!isLogin && orderData?.customerEmail}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                className="pl-10 pr-10 h-11 border-slate-200 focus-visible:ring-0 ] rounded-lg"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-none h-11 text-white font-medium transition-all active:scale-[0.98]"

          >
            {loading
              ? "Please wait..."
              : isLogin
                ? "Login & View Order"
                : "Create Account & Track Order"}
            {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="ml-1.5 font-bold hover:underline"
              style={{ color: "#732D92" }}
            >
              {isLogin ? "Create Account" : "Login Here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountCreationForm;
