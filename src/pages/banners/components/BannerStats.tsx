import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBanners } from "@/hooks/useBanners";
import { 
  ImageIcon, 
  Eye, 
  EyeOff, 
  Calendar,
  TrendingUp
} from "lucide-react";

const BannerStats = () => {
  const { banners } = useBanners();

  const activeBanners = banners.filter(banner => banner.isActive).length;
  const inactiveBanners = banners.filter(banner => !banner.isActive).length;
  const scheduledBanners = banners.filter(banner => 
    banner.endDate && new Date(banner.endDate) > new Date()
  ).length;

  const stats = [
    {
      title: "Total Banners",
      value: banners.length,
      icon: ImageIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
      changeColor: "text-green-600"
    },
    {
      title: "Active Banners",
      value: activeBanners,
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+8%",
      changeColor: "text-green-600"
    },
    {
      title: "Inactive Banners",
      value: inactiveBanners,
      icon: EyeOff,
      color: "text-red-600",
      bgColor: "bg-red-50",
      change: "-3%",
      changeColor: "text-red-600"
    },
    {
      title: "Scheduled",
      value: scheduledBanners,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+5%",
      changeColor: "text-green-600"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${stat.changeColor} bg-transparent`}
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default BannerStats;