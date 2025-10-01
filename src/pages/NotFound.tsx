import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { error, logo } from "@/assets/images";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useEffect(() => {
    document.title = "UrbanDrop || 404 Creative";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="overflow-hidden shadow-2xl border-0 bg-white md:w-5/6 mx-auto">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left side - 404 Content */}
            <div className="flex-1 p-6 sm:p-8 lg:p-12 relative bg-white">
              {/* Logo */}
              <div className="absolute left-1/2 -top-3  transform -translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:left-full lg:-translate-x-1/2 z-50">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <img src={logo} alt="urban logo" />
                  </div>
                </div>
              </div>

              <motion.div
                className="max-w-md mx-auto lg:mx-0 flex flex-col justify-center h-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* 404 Number */}
                <motion.h1
                  className="text-8xl sm:text-9xl font-bold mb-6 text-gray-900 leading-none"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  4
                  <motion.span
                    className="text-red-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.6,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    0
                  </motion.span>
                  4
                </motion.h1>

                {/* Page not found text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Page not found
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-12">
                    Sorry, the page you are looking for can't be found. Please
                    check the URL or try a different page on our site.
                  </p>
                </motion.div>

                {/* Back Home Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        asChild
                        variant="outline"
                        className="w-full h-12 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 text-xs uppercase tracking-wider font-bold"
                      >
                        <Link to="/">
                          <Home size={16} className="mr-2" />
                          Back Home
                        </Link>
                      </Button>
                    </motion.div>

                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => window.history.back()}
                        className="w-full h-12 bg-green-500 hover:bg-green-500/90 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200"
                      >
                        <ArrowLeft size={16} className="mr-2" />
                        Go Back
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Additional Links */}
                <motion.div
                  className="mt-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <p className="text-gray-600 text-sm">
                    Need help?{" "}
                    <Link
                      to="/login"
                      className="text-green-500 font-semibold hover:text-green-500/80 transition-colors"
                    >
                      Log into an Account
                    </Link>{" "}
                    or{" "}
                    <Link
                      to="/forgot-password"
                      className="text-green-500 font-semibold hover:text-green-500/80 transition-colors"
                    >
                      Reset Password
                    </Link>
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Right side - Image and decorations */}
            <motion.div
              className="hidden md:flex md:w-1/2 items-center justify-center bg-green-500 "
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <img
                src={error}
                alt="Login Illustration"
                className="w-full object-contain rounded-md"
              />
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default NotFound;
