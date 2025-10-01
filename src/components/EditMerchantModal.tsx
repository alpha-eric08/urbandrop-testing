import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, X } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { createMerchantSchema, type CreateMerchantFormData } from "@/lib/schemas";
import { useMerchants } from "@/hooks/useMerchants";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Merchant } from "@/assets/data/merchantsData";

interface EditMerchantModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchant: Merchant | null;
}

export const EditMerchantModal = ({ isOpen, onClose, merchant }: EditMerchantModalProps) => {
  const { updateMerchant } = useMerchants();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreateMerchantFormData>({
    resolver: zodResolver(createMerchantSchema),
  });

  useEffect(() => {
    if (merchant && isOpen) {
      setValue("merchantName", merchant.merchantName);
      setValue("email", merchant.email);
      setValue("phone", merchant.phone);
      setValue("merchantAddress", merchant.merchantAddress);
      setValue("postCode", merchant.postCode);
      setValue("businessType", merchant.businessType);
      setValue("country", merchant.country);
      setValue("website", merchant.website || "");
      setValue("joinDate", merchant.joinDate);
      
      if (merchant.joinDate) {
        setDate(parseISO(merchant.joinDate));
      }
    }
  }, [merchant, isOpen, setValue]);

  const onSubmit = (data: CreateMerchantFormData) => {
    if (!merchant) return;
    
    updateMerchant(merchant.id, data);
    
    toast({
      title: "Success",
      description: "Merchant updated successfully",
    });
    
    handleClose();
  };

  const handleClose = () => {
    reset();
    setDate(undefined);
    onClose();
  };

  if (!isOpen || !merchant) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Edit Merchant</h2>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="merchantName">Merchant Name</Label>
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
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Input
                id="businessType"
                {...register("businessType")}
                placeholder="Enter business type"
              />
              {errors.businessType && (
                <p className="text-sm text-destructive">{errors.businessType.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="merchantAddress">Merchant Address</Label>
              <Input
                id="merchantAddress"
                {...register("merchantAddress")}
                placeholder="Enter merchant address"
              />
              {errors.merchantAddress && (
                <p className="text-sm text-destructive">{errors.merchantAddress.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="postCode">Post Code</Label>
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
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                {...register("country")}
                placeholder="Enter country"
              />
              {errors.country && (
                <p className="text-sm text-destructive">{errors.country.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                {...register("website")}
                placeholder="https://example.com"
              />
              {errors.website && (
                <p className="text-sm text-destructive">{errors.website.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Join Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      if (newDate) {
                        setValue("joinDate", format(newDate, "yyyy-MM-dd"));
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.joinDate && (
                <p className="text-sm text-destructive">{errors.joinDate.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Update Merchant</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMerchantModal;