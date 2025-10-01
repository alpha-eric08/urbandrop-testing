import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMerchants } from "@/hooks/useMerchants";

const merchantSchema = z.object({
  merchantName: z.string().min(1, "Merchant name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  merchantAddress: z.string().min(1, "Address is required"),
  postCode: z.string().min(1, "Post code is required"),
  businessType: z.string().min(1, "Business type is required"),
  businessDescription: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
});

type MerchantFormData = z.infer<typeof merchantSchema>;

interface CreateMerchantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateMerchantModal({ isOpen, onClose }: CreateMerchantModalProps) {
  const { addMerchant } = useMerchants();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MerchantFormData>({
    resolver: zodResolver(merchantSchema),
  });

  const onSubmit = async (data: MerchantFormData) => {
    try {
      const newMerchant = {
        ...data,
        status: "Pending" as const,
        createdAt: new Date().toISOString(),
      };
      
      addMerchant(newMerchant);
      
      toast({
        title: "Success",
        description: "Merchant created successfully",
      });
      
      reset();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create merchant",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Merchant</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="merchantName">Merchant Name *</Label>
              <Input
                id="merchantName"
                {...register("merchantName")}
                placeholder="Enter merchant name"
              />
              {errors.merchantName && (
                <p className="text-sm text-destructive">{errors.merchantName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type *</Label>
              <Select onValueChange={(value) => setValue("businessType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Restaurant">Restaurant</SelectItem>
                  <SelectItem value="Grocery Store">Grocery Store</SelectItem>
                  <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.businessType && (
                <p className="text-sm text-destructive">{errors.businessType.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="merchantAddress">Address *</Label>
            <Input
              id="merchantAddress"
              {...register("merchantAddress")}
              placeholder="Enter merchant address"
            />
            {errors.merchantAddress && (
              <p className="text-sm text-destructive">{errors.merchantAddress.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="postCode">Post Code *</Label>
              <Input
                id="postCode"
                {...register("postCode")}
                placeholder="Enter post code"
              />
              {errors.postCode && (
                <p className="text-sm text-destructive">{errors.postCode.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                {...register("website")}
                placeholder="https://example.com"
              />
              {errors.website && (
                <p className="text-sm text-destructive">{errors.website.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessDescription">Business Description</Label>
            <Textarea
              id="businessDescription"
              {...register("businessDescription")}
              placeholder="Describe the business..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Merchant"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}