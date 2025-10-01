import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/schemas";
import { logo } from "@/assets/images";
import RightSideImage from "./RightSideImage";
import { toast } from "sonner";
import { useForgotPassword } from "@/hooks/useAuth";

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [code, setCode] = useState(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const forgotPasswordMutation = useForgotPassword();

  const handleCodeChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode);

    // Move to next input if filled
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    setIsVerifying(true);
    try {
      // Simulate API call for code verification
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Code verified successfully!");
      navigate("/reset-password");
    } catch (error) {
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const email = watch("email");

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        setIsSubmitted(true);
      }
    });
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
          <div className="flex flex-col lg:flex-row">
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

              <div className="max-w-md mx-auto lg:mx-0 ">
                {!isSubmitted ? (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-2">Reset</h2>
                      <p className="text-gray-600 mb-4 font-semibold">
                        Reset to your username/password
                      </p>
                      <p className="text-sm text-gray-500">
                        Enter your email and a reset link will sent to you,
                        let's access our the best recommendation for you.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-700"
                        >
                          Email or Username
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email or username"
                          {...register("email")}
                          className={`w-full h-12 px-4 text-sm border rounded-lg bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={forgotPasswordMutation.isPending}
                        className="w-full h-12 bg-green-500 hover:bg-green-500/90 text-white font-bold text-sm uppercase tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl mt-12"
                      >
                        {forgotPasswordMutation.isPending ? "Sending..." : "Reset Now"}
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="mb-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      Check your email
                    </h2>
                    <p className="text-sm text-gray-500 mb-8">
                      We've sent a password reset link to{" "}
                      <strong className="text-green-500">{email}</strong>
                    </p>

                    {/* Verify */}
                    <div className="space-y-4">
                      <label className="text-sm font-medium text-gray-700 block">
                        Enter 6-digit Verification Code
                      </label>

                      <div className="flex justify-center md:gap-8 gap-1">
                        {code.map((digit, index) => (
                          <input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handleCodeChange(e.target.value, index)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputsRef.current[index] = el)}
                            className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        ))}
                      </div>

                      <Button 
                        onClick={handleVerifyCode}
                        disabled={isVerifying}
                        className="w-full h-12 bg-green-500 text-white font-bold hover:bg-green-600 transition"
                      >
                        {isVerifying ? "Verifying..." : "Verify Code"}
                      </Button>
                    </div>

                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="w-full h-12 mt-4"
                    >
                      Resend Email
                    </Button>
                  </div>
                )}

                <div className="mt-12 text-center">
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
            <RightSideImage />
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
