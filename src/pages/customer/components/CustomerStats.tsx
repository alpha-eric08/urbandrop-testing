import { motion } from "framer-motion";

export default function CustomerStats() {
  const stats = [
    {
      title: "Active Customers",
      value: "142",
      bgColor: "bg-green-100",
      dotColor: "bg-green-500",
      delay: 0.1,
    },
    {
      title: "Premium Subscribers",
      value: "89",
      bgColor: "bg-blue-100",
      dotColor: "bg-blue-500",
      delay: 0.2,
    },
    {
      title: "Inactive Customers",
      value: "23",
      bgColor: "bg-red-100",
      dotColor: "bg-red-500",
      delay: 0.3,
    },
  ];

  return (
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: stat.delay, duration: 0.4 }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
              <div className={`w-6 h-6 ${stat.dotColor} rounded-full`}></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}