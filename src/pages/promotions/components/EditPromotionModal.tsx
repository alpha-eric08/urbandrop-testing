import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePromotions } from "@/hooks/usePromotions";
import { useToast } from "@/hooks/use-toast";
import { Promotion } from "@/assets/data/promotionsData";

interface EditPromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  promotion: Promotion;
}

const EditPromotionModal = ({ isOpen, onClose, promotion }: EditPromotionModalProps) => {
  const { updatePromotion, isLoading } = usePromotions();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: promotion.title,
    description: promotion.description,
    merchant: promotion.merchant,
    merchantEmail: promotion.merchantEmail,
    discount: promotion.discount,
    discountType: promotion.discountType,
    code: promotion.code,
    startDate: promotion.startDate,
    endDate: promotion.endDate,
    status: promotion.status,
    usageLimit: promotion.usageLimit,
    minOrderAmount: promotion.minOrderAmount,
    maxDiscountAmount: promotion.maxDiscountAmount || 0,
    targetAudience: promotion.targetAudience,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await updatePromotion(promotion.id, {
      ...formData,
      lastModified: new Date().toISOString().split('T')[0],
    });
    
    if (result.success) {
      toast({
        title: "Success",
        description: "Promotion updated successfully",
      });
      onClose();
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Edit Promotion</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Promotion Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="merchant">Merchant Name</Label>
              <Input
                id="merchant"
                value={formData.merchant}
                onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="merchantEmail">Merchant Email</Label>
            <Input
              id="merchantEmail"
              type="email"
              value={formData.merchantEmail}
              onChange={(e) => setFormData({ ...formData, merchantEmail: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="discount">Discount Value</Label>
              <Input
                id="discount"
                type="number"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="discountType">Discount Type</Label>
              <select
                id="discountType"
                value={formData.discountType}
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value as "percentage" | "fixed" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="code">Promo Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div>
              <Label htmlFor="usageLimit">Usage Limit</Label>
              <Input
                id="usageLimit"
                type="number"
                value={formData.usageLimit}
                onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="minOrderAmount">Min Order ($)</Label>
              <Input
                id="minOrderAmount"
                type="number"
                value={formData.minOrderAmount}
                onChange={(e) => setFormData({ ...formData, minOrderAmount: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="maxDiscountAmount">Max Discount ($)</Label>
              <Input
                id="maxDiscountAmount"
                type="number"
                value={formData.maxDiscountAmount}
                onChange={(e) => setFormData({ ...formData, maxDiscountAmount: Number(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="targetAudience">Target Audience</Label>
            <select
              id="targetAudience"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Customers</option>
              <option value="new_customers">New Customers</option>
              <option value="vip_customers">VIP Customers</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Promotion"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditPromotionModal;