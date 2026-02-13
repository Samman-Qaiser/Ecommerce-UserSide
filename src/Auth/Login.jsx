import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../tanstackhooks/useAuth";

const AuthPage = () => {
  const navigate = useNavigate();
  const {
    signUp,
    signIn,
    signInWithGoogle,
    resetPassword, // Hook se resetPassword le liya
    loading,
    error,
    setError,
  } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false); // Forgot password toggle
  const [resetSent, setResetSent] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isResetMode) {
        await resetPassword(formData.email);
        setResetSent(true);
      } else if (isLogin) {
        await signIn(formData.email, formData.password);
        navigate("/");
      } else {
        await signUp({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
        });
        navigate("/");
      }
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FDFCFB] p-4">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-800 via-purple-500 to-purple-800" />
      
      <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden relative">
        
        <div className="p-8 sm:p-12">
          {/* Brand Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-50 mb-6 text-purple-700">
              {isResetMode ? <KeyRound size={32} /> : <User size={32} />}
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {isResetMode ? "Reset Password" : isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-slate-500 mt-3 text-sm font-medium">
              {isResetMode 
                ? "Enter your email to receive a recovery link" 
                : isLogin 
                  ? "Experience the finest ethnic wear" 
                  : "Join our exclusive fashion circle"}
            </p>
          </div>

          {/* Success Message for Reset */}
          {resetSent && isResetMode ? (
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-6 text-center">
              <p className="text-sm text-emerald-800 font-medium">Check your inbox! We've sent a reset link.</p>
              <button 
                onClick={() => {setIsResetMode(false); setResetSent(false);}}
                className="mt-2 text-xs font-bold text-emerald-900 underline"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 animate-in fade-in slide-in-from-top-2">
                  <p className="text-xs text-red-600 font-semibold">{error}</p>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                {!isLogin && !isResetMode && (
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <Input
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="John Doe"
                        className="pl-11 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-purple-100 transition-all rounded-xl"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="pl-11 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-purple-100 transition-all rounded-xl"
                      required
                    />
                  </div>
                </div>

                {!isResetMode && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center px-1">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Password</Label>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                        className="pl-11 pr-11 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-purple-100 transition-all rounded-xl"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-purple-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {isLogin && (
                      <div className="text-right">
                        <button
                          type="button"
                          onClick={() => {setIsResetMode(true); setError(null);}}
                          className="text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors"
                        >
                          Forgot Password?
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-slate-900 hover:bg-black text-white rounded-xl font-bold transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group"
                >
                  {loading ? "Processing..." : isResetMode ? "Send Recovery Link" : isLogin ? "Sign In" : "Create Account"}
                  {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </Button>
              </form>

              {!isResetMode && (
                <>
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                    <span className="relative px-4 text-[10px] font-black text-slate-400 bg-white uppercase tracking-[0.2em] block text-center">OR</span>
                  </div>

                  <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    variant="outline"
                    className="w-full h-12 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 rounded-xl transition-all flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-5.38z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </Button>
                </>
              )}
            </>
          )}

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => {
                setIsResetMode(false);
                setIsLogin(!isLogin);
                setError(null);
                setResetSent(false);
              }}
              className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              {isResetMode 
                ? "Remember your password? Login" 
                : isLogin 
                  ? <>Don't have an account? <span className="text-purple-700 font-bold">Register</span></> 
                  : <>Already have an account? <span className="text-purple-700 font-bold">Login</span></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;