import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/schemas";
import RightSideImage from "./RightSideImage";
import { logo } from "@/assets/images";
import { toast } from "sonner";
import { useResetPassword } from "@/hooks/useAuth";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const resetPasswordMutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  // Password strength calculation
  useEffect(() => {
    let strength = 0;
    if (newPassword && newPassword.length >= 8) strength++;
    if (newPassword && /[A-Z]/.test(newPassword)) strength++;
    if (newPassword && /[0-9]/.test(newPassword)) strength++;
    if (newPassword && /[^A-Za-z0-9]/.test(newPassword)) strength++;
    setPasswordStrength(strength);
  }, [newPassword]);

  const onSubmit = (data: ResetPasswordFormData) => {
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    
    if (!email || !token) {
      toast.error('Invalid reset link. Please request a new one.');
      return;
    }

    resetPasswordMutation.mutate({
      email,
      token,
      new_password: data.newPassword,
    });
  };

  const getStrengthColor = (index: number) => {
    if (index < passwordStrength) {
      if (passwordStrength <= 1) return "bg-red-500";
      if (passwordStrength <= 2) return "bg-yellow-500";
      if (passwordStrength <= 3) return "bg-blue-500";
      return "bg-green-500";
    }
    return "bg-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-gray-100 to-green-200 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="overflow-hidden shadow-2xl border-0 bg-white md:w-5/6 mx-auto">
          <div className="flex flex-col lg:flex-row ">
            {/* Left side - Reset Form */}
            <div className="flex-1 p-6 sm:p-8 lg:p-12 relative bg-white">
              {/* Logo – Centered on large screens, top-left on small screens */}
              <div className="absolute left-1/2 -top-3  transform -translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:left-full lg:-translate-x-1/2 z-50">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <img src={logo} alt="urban logo" />
                  </div>
                </div>
              </div>

              <div className="max-w-md mx-auto lg:mx-0">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Resetting</h2>
                  <p className="text-gray-600 mb-4">Reset to your password</p>
                  <p className="text-sm text-gray-500">
                    Enter your new password below to complete the reset process.
                    Choose a strong password to keep your account secure.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="New Password"
                        {...register("newPassword")}
                        className={`w-full h-12 px-4 pr-12 text-sm border rounded-lg bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors ${
                          errors.newPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showNewPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {newPassword && (
                      <div className="space-y-2">
                        <div className="flex space-x-1">
                          {[0, 1, 2, 3].map((index) => (
                            <div
                              key={index}
                              className={`h-1 flex-1 rounded-full transition-colors ${getStrengthColor(
                                index
                              )}`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">
                          Password strength:{" "}
                          {passwordStrength === 0
                            ? "Very Weak"
                            : passwordStrength === 1
                            ? "Weak"
                            : passwordStrength === 2
                            ? "Fair"
                            : passwordStrength === 3
                            ? "Good"
                            : "Strong"}
                        </p>
                      </div>
                    )}
                    {errors.newPassword && (
                      <p className="text-xs text-red-500">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your new password"
                        {...register("confirmPassword")}
                        className={`w-full h-12 px-4 pr-12 text-sm border rounded-lg bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={resetPasswordMutation.isPending}
                    className="w-full h-12 bg-green-500 hover:bg-green-500/90 text-white font-bold text-sm uppercase tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl mt-12"
                  >
                    {resetPasswordMutation.isPending ? "Saving..." : "Save Change"}
                  </Button>
                </form>

                <div className="mt-5 text-center">
                  <p className="text-gray-600 text-sm mt-2">
                    Remember your password?{" "}
                    <Link
                      to="/login"
                      className="text-green-500 font-semibold hover:text-green-500/80 transition-colors"
                    >
                      Back to Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Image */}
           <RightSideImage/>

          </div>
        </Card>
      </motion.div>
    </div>
  );
}
