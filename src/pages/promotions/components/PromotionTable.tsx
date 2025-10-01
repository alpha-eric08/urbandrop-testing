import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Trash2, Plus, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePromotions } from "@/hooks/usePromotions";
import { getPromotionStatusColor } from "@/assets/data/promotionsData";
import CreatePromotionModal from "./CreatePromotionModal";
import EditPromotionModal from "./EditPromotionModal";
import { useToast } from "@/hooks/use-toast";

const PromotionTable = () => {
  const { promotions, deletePromotion } = usePromotions();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);

  const filteredPromotions = promotions.filter(promotion => {
    const matchesSearch = promotion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || promotion.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      const result = await deletePromotion(id);
      if (result.success) {
        toast({
          title: "Success",
          description: "Promotion deleted successfully",
        });
      } else {
        toast({
          title: "Error", 
          description: result.error,
          variant: "destructive",
        });
      }
    }
  };

  const handleEdit = (promotion: any) => {
    setSelectedPromotion(promotion);
    setIsEditModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDiscount = (discount: number, type: string) => {
    return type === "percentage" ? `${discount}%` : `$${discount}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">All Promotions</h2>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search promotions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
              <option value="draft">Draft</option>
            </select>
            
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Promotion
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Promotion
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Merchant
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Discount & Code
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Usage
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPromotions.map((promotion, index) => (
              <motion.tr
                key={promotion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{promotion.title}</div>
                    <div className="text-sm text-gray-500">{promotion.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={promotion.merchantAvatar}
                      alt={promotion.merchant}
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{promotion.merchant}</div>
                      <div className="text-sm text-gray-500">{promotion.merchantEmail}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {formatDiscount(promotion.discount, promotion.discountType)}
                  </div>
                  <div className="text-sm text-gray-500 font-mono">{promotion.code}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-900">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(promotion.startDate)}
                  </div>
                  <div className="text-sm text-gray-500">
                    to {formatDate(promotion.endDate)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {promotion.usageCount}/{promotion.usageLimit}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ 
                        width: `${Math.min((promotion.usageCount / promotion.usageLimit) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={getPromotionStatusColor(promotion.status)}>
                    {promotion.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(promotion)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(promotion.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <CreatePromotionModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      
      {selectedPromotion && (
        <EditPromotionModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedPromotion(null);
          }}
          promotion={selectedPromotion}
        />
      )}
    </motion.div>
  );
};

export default PromotionTable;