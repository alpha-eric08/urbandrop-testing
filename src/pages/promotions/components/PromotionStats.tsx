import { motion } from "framer-motion";
import { Gift, CheckCircle, Clock, XCircle } from "lucide-react";
import { usePromotions } from "@/hooks/usePromotions";

const PromotionStats = () => {
  const { promotions } = usePromotions();

  const stats = [
    {
      title: "Total Promotions",
      value: promotions.length,
      icon: Gift,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Promotions", 
      value: promotions.filter(p => p.status === "active").length,
      icon: CheckCircle,
      color: "bg-green-500",
      textColor: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Pending Approval",
      value: promotions.filter(p => p.status === "pending").length,
      icon: Clock,
      color: "bg-yellow-500",
      textColor: "text-yellow-600", 
      bgColor: "bg-yellow-50"
    },
    {
      title: "Expired/Inactive",
      value: promotions.filter(p => p.status === "expired" || p.status === "inactive").length,
      icon: XCircle,
      color: "bg-red-500", 
      textColor: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-3xl font-bold ${stat.textColor} mt-2`}>
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PromotionStats;