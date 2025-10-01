
import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { StatsLoadingSkeleton, LoadingSkeleton } from "@/components/ui/loading-skeleton";

// Lazy load components
const StatCard = lazy(() => import("@/pages/dashboard/components/StatCard"));
const PaymentActivity = lazy(() => import("@/pages/dashboard/components/PaymentActivity"));
const ApprovedPendingRiders = lazy(() => import("@/pages/dashboard/components/OrderStatus"));
const MerchantsProductUpdate = lazy(() => import("@/pages/dashboard/components/MerchantsProductUpdate"));
const ApprovedProductsbyMerchant = lazy(() => import("@/pages/dashboard/components/ApprovedProductsbyMerchant"));
const ActivePromotions = lazy(() => import("@/pages/dashboard/components/ActivePromotions"));

export default function Dashboard() {
  return (
    <div>
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 lg:ml-0"
      >
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-slate-700 border-r border-gray-300 pr-3">
            Dashboard
          </h2>
          <nav className="flex items-center space-x-2 text-sm">
            <a
              href="#"
              className="text-slate-600 hover:text-slate-800 font-medium"
            >
              Home &gt;
            </a>
            <span className="text-gray-400">Overview</span>
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="md:p-8 p-4">
        {/* Statistics Cards */}
        <Suspense fallback={<StatsLoadingSkeleton />}>
          <StatCard />
        </Suspense>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Payment Activity Section */}
          <div className="md:col-span-2">
            <Suspense fallback={<LoadingSkeleton rows={6} />}>
              <PaymentActivity />
            </Suspense>
          </div>

          {/* Approved & Pending Riders */}
          <Suspense fallback={<LoadingSkeleton rows={4} />}>
            <ApprovedPendingRiders />
          </Suspense>

          {/* Merchants Product Update */}
          <Suspense fallback={<LoadingSkeleton rows={4} />}>
            <MerchantsProductUpdate />
          </Suspense>

          {/* Active Promotions */}
          <Suspense fallback={<LoadingSkeleton rows={4} />}>
            <ActivePromotions />
          </Suspense>
            
          {/* Approved Products by Merchant */}
          <Suspense fallback={<LoadingSkeleton rows={4} />}>
            <ApprovedProductsbyMerchant />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
