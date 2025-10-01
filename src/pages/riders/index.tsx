import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

const RiderStats = lazy(() => import("./components/RiderStats"));
const RiderTable = lazy(() => import("./components/RiderTable"));

const RidersPage = () => {
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
            <h1 className="text-3xl font-bold text-gray-900">Riders Management</h1>
            <p className="text-gray-600 mt-1">Manage and monitor your delivery riders</p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <Suspense fallback={<LoadingSkeleton />}>
          <RiderStats />
        </Suspense>

        {/* Riders Table */}
        <Suspense fallback={<LoadingSkeleton />}>
          <RiderTable />
        </Suspense>
      </motion.div>
    </div>
  );
};

export default RidersPage;