import { Suspense, lazy, useState } from "react";
import { motion } from "framer-motion";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { Button } from "@/components/ui/button";
import { Plus, FolderPlus } from "lucide-react";

const CategoryStats = lazy(() => import("./components/CategoryStats"));
const CategoryTable = lazy(() => import("./components/CategoryTable"));
const CreateCategoryModal = lazy(() => import("./components/CreateCategoryModal"));
const CreateSubcategoryModal = lazy(() => import("./components/CreateSubcategoryModal"));

const CategoriesPage = () => {
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
  const [isCreateSubcategoryModalOpen, setIsCreateSubcategoryModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const handleAddSubcategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setIsCreateSubcategoryModalOpen(true);
  };

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
            <h1 className="text-3xl font-bold text-gray-900">Product Categories</h1>
            <p className="text-gray-600 mt-1">Manage product categories and subcategories</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              onClick={() => setIsCreateSubcategoryModalOpen(true)}
              className="flex items-center gap-2"
            >
              <FolderPlus className="h-4 w-4" />
              Add Subcategory
            </Button>
            <Button 
              onClick={() => setIsCreateCategoryModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <Suspense fallback={<LoadingSkeleton />}>
          <CategoryStats />
        </Suspense>

        {/* Categories Table */}
        <Suspense fallback={<LoadingSkeleton />}>
          <CategoryTable onAddSubcategory={handleAddSubcategory} />
        </Suspense>

        {/* Create Category Modal */}
        <Suspense fallback={null}>
          <CreateCategoryModal 
            open={isCreateCategoryModalOpen} 
            onOpenChange={setIsCreateCategoryModalOpen} 
          />
        </Suspense>

        {/* Create Subcategory Modal */}
        <Suspense fallback={null}>
          <CreateSubcategoryModal 
            open={isCreateSubcategoryModalOpen} 
            onOpenChange={setIsCreateSubcategoryModalOpen}
            selectedCategoryId={selectedCategoryId}
          />
        </Suspense>
      </motion.div>
    </div>
  );
};

export default CategoriesPage;