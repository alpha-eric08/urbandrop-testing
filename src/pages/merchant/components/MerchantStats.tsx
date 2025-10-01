import { motion } from "framer-motion";
import { Store, Plus } from "lucide-react";
import { Merchant, SAMPLE_MERCHANTS } from "@/assets/data/merchant";
import React, { useState, useEffect } from "react";

const MerchantStats = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);

  // Initialize with sample data
  useEffect(() => {
    setMerchants(SAMPLE_MERCHANTS);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Store className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {merchants.filter((m) => m.status === "Active").length}
            </div>
            <div className="text-sm text-gray-600">Active Merchants</div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Store className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {merchants.filter((m) => m.status === "Pending").length}
            </div>
            <div className="text-sm text-gray-600">Pending Approval</div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <Store className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {merchants.filter((m) => m.status === "Suspended").length}
            </div>
            <div className="text-sm text-gray-600">Suspended</div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Store className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {merchants.length}
            </div>
            <div className="text-sm text-gray-600">Total Merchants</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MerchantStats;
