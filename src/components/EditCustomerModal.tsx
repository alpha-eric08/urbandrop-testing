import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Calendar as CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, type CustomerFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Customer } from "@/hooks/useCustomers";

interface EditCustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
  onSave: (id: string, data: Partial<Customer>) => void;
}

export default function EditCustomerModal({ 
  open, 
  onOpenChange, 
  customer,
  onSave 
}: EditCustomerModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });

  const watchedSubscriptionStatus = watch("subscriptionStatus");
  const watchedAccountStatus = watch("accountStatus");

  useEffect(() => {
    if (customer && open) {
      const [firstName, ...lastNameParts] = customer.name.split(' ');
      reset({
        firstName,
        lastName: lastNameParts.join(' '),
        email: customer.email,
        phone: customer.phone,
        website: customer.website || '',
        dateOfBirth: customer.dateOfBirth ? new Date(customer.dateOfBirth) : undefined,
        subscriptionStatus: customer.subscriptionStatus,
        accountStatus: customer.accountStatus,
        // Set default values for required fields
        address: customer.location || '',
        country: customer.country || '',
        city: '',
        zipCode: '',
      });
    }
  }, [customer, open, reset]);

  const onSubmit = async (data: CustomerFormData) => {
    if (!customer) return;
    
    setIsLoading(true);
    console.log("Updating customer:", data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSave(customer.id, {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      subscriptionStatus: data.subscriptionStatus,
      accountStatus: data.accountStatus,
    });
    
    setIsLoading(false);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Customer</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Personal Information
              </h3>
              
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  className="mt-1"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  className="mt-1"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="subscriptionStatus">Subscription Status</Label>
                <Select
                  value={watchedSubscriptionStatus}
                  onValueChange={(value) => setValue("subscriptionStatus", value as "Premium" | "Basic")}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select subscription" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
                {errors.subscriptionStatus && (
                  <p className="text-sm text-red-600 mt-1">{errors.subscriptionStatus.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="accountStatus">Account Status</Label>
                <Select
                  value={watchedAccountStatus}
                  onValueChange={(value) => setValue("accountStatus", value as "Active" | "Inactive" | "Pending" | "Suspended")}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                {errors.accountStatus && (
                  <p className="text-sm text-red-600 mt-1">{errors.accountStatus.message}</p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Contact Information
              </h3>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-1"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  className="mt-1"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Additional Information
              </h3>
              
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://example.com"
                  {...register("website")}
                  className="mt-1"
                />
                {errors.website && (
                  <p className="text-sm text-red-600 mt-1">{errors.website.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !watch("dateOfBirth") && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watch("dateOfBirth") ? (
                        format(watch("dateOfBirth"), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={watch("dateOfBirth")}
                      onSelect={(date) => setValue("dateOfBirth", date)}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                {errors.dateOfBirth && (
                  <p className="text-sm text-red-600 mt-1">{errors.dateOfBirth.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Customer"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}