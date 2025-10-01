import { statsCards } from "@/assets/data/statsCard";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp } from "lucide-react";



const StatCard = () => {
 return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
      {statsCards.map((card, index) => (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-hidden"
        >
          <div className="flex items-center justify-between">
            {/* Left side - Icon and Text */}
            <div className="flex items-center gap-4">
              {/* Icon Container */}
              <div
                className={`${card.bgColor} rounded flex items-center justify-center w-16 h-16 shadow-md`}
              >
                <card.icon className="w-6 h-6" />
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-700 truncate max-w-full overflow-hidden">
                  {card.title}
                </span>
                <span className="text-2xl font-extrabold text-gray-900 leading-tight">
                  {card.value}
                </span>
              </div>
            </div>

            {/* Right side - Percentage Badge */}
            <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold text-center whitespace-nowrap flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{card.percentage}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default StatCard