
import React, { useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Store, Plus } from "lucide-react";
import { Merchant } from "@/assets/data/merchantsData";
import { useMerchants } from "@/hooks/useMerchants";
import { LoadingSkeleton, StatsLoadingSkeleton, TableLoadingSkeleton } from "@/components/ui/loading-skeleton";

// Lazy load components
const MerchantView = lazy(() => import("./components/MerchantView"));
const MerchantTable = lazy(() => import("./components/MerchantTable"));
const MerchantStats = lazy(() => import("./components/MerchantStats"));
const CreateMerchantModal = lazy(() => import("@/components/CreateMerchantModal"));
const EditMerchantModal = lazy(() => import("@/components/EditMerchantModal"));

const Merchants: React.FC = () => {
  const { merchants, deleteMerchant } = useMerchants();
  const [currentView, setCurrentView] = useState<"table" | "view">("table");
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleCreateNew = () => {
    setShowCreateModal(true);
  };

  const handleEdit = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    setShowEditModal(true);
  };

  const handleView = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    setCurrentView("view");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this merchant?")) {
      deleteMerchant(id);
    }
  };

  const handleViewClose = () => {
    setCurrentView("table");
    setSelectedMerchant(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Store className="w-8 h-8 text-[#5cb35e]" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Merchant Management</h1>
                <p className="text-gray-600">Manage and monitor merchant accounts and activities</p>
              </div>
            </div>
            {currentView === "table" && (
              <button
                onClick={handleCreateNew}
                className="bg-[#5cb35e] text-white px-6 py-3 rounded-lg hover:bg-[#4a9f4d] transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Merchant
              </button>
            )}
          </div>

          {/* Stats Overview */}
          <Suspense fallback={<StatsLoadingSkeleton />}>
            <MerchantStats />
          </Suspense>
        </motion.div>

        {/* Content */}
        {currentView === "table" && (
          <Suspense fallback={<TableLoadingSkeleton rows={6} />}>
            <MerchantTable
              merchants={merchants}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              onCreateNew={handleCreateNew}
            />
          </Suspense>
        )}

        {currentView === "view" && selectedMerchant && (
          <Suspense fallback={<LoadingSkeleton rows={8} />}>
            <MerchantView
              merchant={selectedMerchant}
              onClose={handleViewClose}
              onEdit={handleEdit}
            />
          </Suspense>
        )}

        {/* Modals */}
        <Suspense fallback={null}>
          <CreateMerchantModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
          />
        </Suspense>
        
        <Suspense fallback={null}>
          <EditMerchantModal
            isOpen={showEditModal && !!selectedMerchant}
            onClose={() => {
              setShowEditModal(false);
              setSelectedMerchant(null);
            }}
            merchant={selectedMerchant}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Merchants;
