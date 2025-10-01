import { Suspense, lazy, useState } from "react";
import { motion } from "framer-motion";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TableIcon, LayoutGridIcon, Plus } from "lucide-react";

const BannerStats = lazy(() => import("./components/BannerStats"));
const BannerTable = lazy(() => import("./components/BannerTable"));
const BannerGrid = lazy(() => import("./components/BannerGrid"));
const CreateBannerModal = lazy(() => import("./components/CreateBannerModal"));

const BannersPage = () => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Banner Management</h1>
            <p className="text-gray-600 mt-1">Create and manage promotional banners</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white p-2 rounded-lg border">
              <Label htmlFor="view-mode" className="text-sm flex items-center gap-2">
                <TableIcon className="h-4 w-4" />
                Table
              </Label>
              <Switch
                id="view-mode"
                checked={viewMode === 'grid'}
                onCheckedChange={(checked) => setViewMode(checked ? 'grid' : 'table')}
              />
              <Label htmlFor="view-mode" className="text-sm flex items-center gap-2">
                <LayoutGridIcon className="h-4 w-4" />
                Gallery
              </Label>
            </div>
            
            {/* Add Banner Button */}
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Banner
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <Suspense fallback={<LoadingSkeleton />}>
          <BannerStats />
        </Suspense>

        {/* Banner Content */}
        <Suspense fallback={<LoadingSkeleton />}>
          {viewMode === 'table' ? <BannerTable /> : <BannerGrid />}
        </Suspense>

        {/* Create Banner Modal */}
        <Suspense fallback={null}>
          <CreateBannerModal 
            open={isCreateModalOpen} 
            onOpenChange={setIsCreateModalOpen} 
          />
        </Suspense>
      </motion.div>
    </div>
  );
};

export default BannersPage;