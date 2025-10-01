import { useState } from "react";
import { motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TabData {
  id: string;
  label: string;
  value: string;
  deals: string;
  isActive?: boolean;
}

interface ChartData {
  date: string;
  orders: number;
  serviceFee: number;
  delivery: number;
}

const tabsData: TabData[] = [
  {
    id: "orders",
    label: "Orders",
    value: "£47,569",
    deals: "57 Deals",
  },
  {
    id: "service-fee",
    label: "Service Fee",
    value: "£35,258",
    deals: "46 Deals",
    isActive: true,
  },
  {
    id: "delivery",
    label: "Delivery",
    value: "£24,569",
    deals: "34 Deals",
  },
];

// Generate data for different time periods
const generateChartData = (period: string): ChartData[] => {
  const baseData = {
    "3months": [
      { date: "Apr 6", orders: 47200, serviceFee: 35100, delivery: 24300 },
      { date: "Apr 12", orders: 48100, serviceFee: 35800, delivery: 24900 },
      { date: "Apr 18", orders: 46800, serviceFee: 34200, delivery: 23800 },
      { date: "Apr 24", orders: 49200, serviceFee: 36500, delivery: 25100 },
      { date: "Apr 30", orders: 45900, serviceFee: 33800, delivery: 23400 },
      { date: "May 6", orders: 48600, serviceFee: 35600, delivery: 24700 },
      { date: "May 12", orders: 47800, serviceFee: 35200, delivery: 24500 },
      { date: "May 18", orders: 49800, serviceFee: 36800, delivery: 25400 },
      { date: "May 24", orders: 50200, serviceFee: 37100, delivery: 25800 },
      { date: "May 30", orders: 46200, serviceFee: 34000, delivery: 23600 },
      { date: "Jun 5", orders: 49500, serviceFee: 36600, delivery: 25200 },
      { date: "Jun 11", orders: 50800, serviceFee: 37500, delivery: 26000 },
      { date: "Jun 17", orders: 47000, serviceFee: 34600, delivery: 24000 },
      { date: "Jun 23", orders: 48900, serviceFee: 36000, delivery: 25000 },
      { date: "Jun 30", orders: 50500, serviceFee: 37200, delivery: 25700 },
    ],
    "2months": [
      { date: "May 1", orders: 48600, serviceFee: 35600, delivery: 24700 },
      { date: "May 8", orders: 47800, serviceFee: 35200, delivery: 24500 },
      { date: "May 15", orders: 49800, serviceFee: 36800, delivery: 25400 },
      { date: "May 22", orders: 50200, serviceFee: 37100, delivery: 25800 },
      { date: "May 29", orders: 46200, serviceFee: 34000, delivery: 23600 },
      { date: "Jun 5", orders: 49500, serviceFee: 36600, delivery: 25200 },
      { date: "Jun 12", orders: 50800, serviceFee: 37500, delivery: 26000 },
      { date: "Jun 19", orders: 47000, serviceFee: 34600, delivery: 24000 },
      { date: "Jun 26", orders: 48900, serviceFee: 36000, delivery: 25000 },
      { date: "Jun 30", orders: 50500, serviceFee: 37200, delivery: 25700 },
    ],
    "1month": [
      { date: "Jun 1", orders: 49500, serviceFee: 36600, delivery: 25200 },
      { date: "Jun 5", orders: 50800, serviceFee: 37500, delivery: 26000 },
      { date: "Jun 10", orders: 47000, serviceFee: 34600, delivery: 24000 },
      { date: "Jun 15", orders: 48900, serviceFee: 36000, delivery: 25000 },
      { date: "Jun 20", orders: 50500, serviceFee: 37200, delivery: 25700 },
      { date: "Jun 25", orders: 49200, serviceFee: 36300, delivery: 25100 },
      { date: "Jun 30", orders: 51200, serviceFee: 37800, delivery: 26200 },
    ],
    "7days": [
      { date: "Jun 24", orders: 49200, serviceFee: 36300, delivery: 25100 },
      { date: "Jun 25", orders: 49800, serviceFee: 36700, delivery: 25400 },
      { date: "Jun 26", orders: 48600, serviceFee: 35800, delivery: 24800 },
      { date: "Jun 27", orders: 50100, serviceFee: 37000, delivery: 25600 },
      { date: "Jun 28", orders: 50700, serviceFee: 37400, delivery: 25900 },
      { date: "Jun 29", orders: 49900, serviceFee: 36800, delivery: 25500 },
      { date: "Jun 30", orders: 51200, serviceFee: 37800, delivery: 26200 },
    ],
  };

  return baseData[period as keyof typeof baseData] || baseData["3months"];
};

const chartConfig = {
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
  serviceFee: {
    label: "Service Fee",
    color: "hsl(var(--chart-2))",
  },
  delivery: {
    label: "Delivery",
    color: "hsl(var(--chart-3))",
  },
};

function InteractiveAreaChart() {
  const [timeRange, setTimeRange] = useState("7days");
const chartData = generateChartData(timeRange);

  const timeRangeLabels = {
    "3months": "Last 3 months",
    "2months": "Last 2 months", 
    "1month": "Last month",
    "7days": "Last 7 days",
    "30days": "Last 30 days",
    "1week": "This week",
  };

  return (
    <div className="relative bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 pb-6 px-6 pt-5">
        <div className="grid gap-1">
          <h3 className="font-semibold leading-none tracking-tight">
            Payment Chart
          </h3>
          <p className="text-sm text-muted-foreground">
            Showing payment activity for the selected time period
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="1month">Last month</SelectItem>
            <SelectItem value="2months">Last 2 months</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="px-6 pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <defs>
              <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-orders)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-orders)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillServiceFee" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-serviceFee)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-serviceFee)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillDelivery" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-delivery)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-delivery)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="delivery"
              type="natural"
              fill="url(#fillDelivery)"
              fillOpacity={0.6}
              stroke="var(--color-delivery)"
              stackId="1"
            />
            <Area
              dataKey="serviceFee"
              type="natural"
              fill="url(#fillServiceFee)"
              fillOpacity={0.6}
              stroke="var(--color-serviceFee)"
              stackId="1"
            />
            <Area
              dataKey="orders"
              type="natural"
              fill="url(#fillOrders)"
              fillOpacity={0.6}
              stroke="var(--color-orders)"
              stackId="1"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}

export default function PayChart() {
  const [activeTab, setActiveTab] = useState("service-fee");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Payment Activity</h2>
        <p className="text-sm text-gray-500 mt-1">
          Monitor your payment performance and trends
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {tabsData.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 sm:px-8 py-6 rounded-xl border-2 border-dashed transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200 text-black shadow-lg shadow-blue-100/50"
                  : "bg-white border-gray-300 text-slate-700 hover:border-gray-400 hover:shadow-md hover:bg-gray-50/50"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl shadow-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="text-left relative z-10 w-full">
                <motion.div
                  className="font-semibold text-sm"
                  animate={{
                    color: activeTab === tab.id ? "#334155" : "#64748b",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {tab.label}
                </motion.div>
                <motion.div
                  className="text-xl sm:text-2xl font-bold mt-2"
                  animate={{
                    color: "#000000",
                    scale: activeTab === tab.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {tab.value}
                </motion.div>
                <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  {tab.deals}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-gradient-to-br from-white to-gray-50/30 rounded-xl border border-gray-100 relative shadow-sm overflow-hidden"
        >
          <InteractiveAreaChart />
        </motion.div>
      </div>
    </motion.div>
  );
}
