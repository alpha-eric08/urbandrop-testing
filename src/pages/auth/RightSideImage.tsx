import { login } from "@/assets/images";
import { motion } from "framer-motion";

const RightSideImage = () => {
  return (
    <motion.div
      className="hidden md:flex md:w-1/2 items-center justify-center bg-green-500 "
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <img
        src={login}
        alt="Login Illustration"
        className="w-full object-contain rounded-md"
      />
    </motion.div>
  );
};

export default RightSideImage;
