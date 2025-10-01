import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePromotions } from "@/hooks/usePromotions";
import { useToast } from "@/hooks/use-toast";

interface CreatePromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePromotionModal = ({ isOpen, onClose }: CreatePromotionModalProps) => {
  const { createPromotion, isLoading } = usePromotions();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    merchant: "",
    merchantEmail: "",
    discount: 0,
    discountType: "percentage" as "percentage" | "fixed",
    code: "",
    startDate: "",
    endDate: "",
    usageLimit: 100,
    minOrderAmount: 0,
    maxDiscountAmount: 0,
    targetAudience: "all" as "all" | "new_customers" | "vip_customers",
  });

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, code: result });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const promotionData = {
      ...formData,
      merchantAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.merchant)}&background=random`,
      status: "draft" as const,
      usageCount: 0,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
    };

    const result = await createPromotion(promotionData);
    
    if (result.success) {
      toast({
        title: "Success",
        description: "Promotion created successfully",
      });
      onClose();
      setFormData({
        title: "",
        description: "",
        merchant: "",
        merchantEmail: "",
        discount: 0,
        discountType: "percentage",
        code: "",
        startDate: "",
        endDate: "",
        usageLimit: 100,
        minOrderAmount: 0,
        maxDiscountAmount: 0,
        targetAudience: "all",
      });
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
          <h2 className="text-xl font-semibold">Create New Promotion</h2>
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
              <div className="flex gap-2">
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  required
                />
                <Button type="button" onClick={generateCode} variant="outline">
                  Generate
                </Button>
              </div>
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

          <div className="grid grid-cols-3 gap-4">
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
              <Label htmlFor="minOrderAmount">Min Order Amount ($)</Label>
              <Input
                id="minOrderAmount"
                type="number"
                value={formData.minOrderAmount}
                onChange={(e) => setFormData({ ...formData, minOrderAmount: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="maxDiscountAmount">Max Discount Amount ($)</Label>
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
              {isLoading ? "Creating..." : "Create Promotion"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePromotionModal;