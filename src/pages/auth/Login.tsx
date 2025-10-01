import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Facebook, Twitter, Github } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormData } from "@/lib/schemas";
import { logo } from "@/assets/images";
import { useLogin } from "@/hooks/useAuth";
import RightSideImage from "./RightSideImage";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const rememberMe = watch("rememberMe");

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-gray-100 to-green-200 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
      <Card className="overflow-hidden shadow-2xl mx-auto border-0 bg-white md:w-5/6">
          <div className="flex flex-col lg:flex-row ">
            {/* Left side - Login Form */}
            <div className="flex-1 p-6 sm:p-8 lg:p-12 relative bg-white">
              {/* Logo – Centered on large screens, top-left on small screens */}
              <div className="absolute left-1/2 -top-3  transform -translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:left-full lg:-translate-x-1/2 z-50">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <img src={logo} alt="urban logo" />
                  </div>
                </div>
              </div>

              <motion.div
                className="max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-2">Login</h2>
                  <p className="text-gray-600 mb-4">Login to your account</p>
                  <p className="text-sm text-gray-500">
                    Thank you for get back Nelel web applications, let's access
                    our the best recommendation for you.
                  </p>
                </motion.div>

                <motion.form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email or Username"
                      {...register("email")}
                      className={`w-full mb-3 p-3 text-sm border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          className="text-xs text-red-500"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {errors.email.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password")}
                        className={`w-full mb-3 p-3 pr-12 text-sm border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </motion.button>
                    </div>
                    <AnimatePresence>
                      {errors.password && (
                        <motion.p
                          className="text-xs text-red-500"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {errors.password.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) =>
                          setValue("rememberMe", checked as boolean)
                        }
                        className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm text-gray-700 cursor-pointer select-none"
                      >
                        Remember Me
                      </label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-semibold text-green-500 hover:text-green-500/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full h-12 bg-green-500 hover:bg-green-500/90 text-white font-bold text-sm uppercase tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                      >
                        <motion.span
                          key={loginMutation.isPending ? "loading" : "login"}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {loginMutation.isPending ? "Logging in..." : "Login"}
                        </motion.span>
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.form>

                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm uppercase">
                      <span className="bg-white px-4 text-gray-500 font-medium">
                        or continue with
                      </span>
                    </div>
                  </div>

                  <motion.div
                    className="mt-6 grid grid-cols-3 gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                      >
                        <Facebook size={18} className="text-blue-600" />
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                      >
                        <Twitter size={18} className="text-blue-400" />
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                      >
                        <Github size={18} className="text-gray-800" />
                      </Button>
                    </motion.div>
                  </motion.div>

                </motion.div>
              </motion.div>
            </div>

            {/* Right side - Image */}
           <RightSideImage/>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
