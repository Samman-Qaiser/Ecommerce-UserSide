import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "../tanstackhooks/useAuth";

const AccountCreationForm = ({ orderId, orderData, onSuccess }) => {
  const { signUp, signIn, loading, error, setError } = useAuth();

  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: orderData?.customerName || "",
    email: orderData?.customerEmail || "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
      } else {
        await signUp({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
        });
      }

      // Link order to user account
      // This will be handled automatically in the auth hooks

      onSuccess();
    } catch (err) {
      console.error("Account creation error:", err);
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
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
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
                className="pl-10 h-11 border-slate-200 focus-visible:ring-0 rounded-lg"
                required
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
                className="pl-10 pr-10 h-11 border-slate-200 focus-visible:ring-0 rounded-lg"
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
            style={{ backgroundColor: "#732D92" }}
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
                setError(null);
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