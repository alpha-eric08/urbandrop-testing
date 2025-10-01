import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

const PromotionStats = lazy(() => import("./components/PromotionStats"));
const PromotionTable = lazy(() => import("./components/PromotionTable"));

const PromotionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Promotions Management</h1>
            <p className="text-gray-600 mt-1">Create and manage promotional campaigns</p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <Suspense fallback={<LoadingSkeleton />}>
          <PromotionStats />
        </Suspense>

        {/* Promotions Table */}
        <Suspense fallback={<LoadingSkeleton />}>
          <PromotionTable />
        </Suspense>
      </motion.div>
    </div>
  );
};

export default PromotionsPage;