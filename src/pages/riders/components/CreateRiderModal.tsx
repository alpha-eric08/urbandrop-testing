import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRiders } from "@/hooks/useRiders";
import { useToast } from "@/hooks/use-toast";

interface CreateRiderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRiderModal = ({ isOpen, onClose }: CreateRiderModalProps) => {
  const { createRider, isLoading } = useRiders();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    license: "",
    zone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const riderData = {
      ...formData,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`,
      status: "pending" as const,
      deliveries: 0,
      rating: 0,
      earnings: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString(),
    };

    const result = await createRider(riderData);
    
    if (result.success) {
      toast({
        title: "Success",
        description: "Rider created successfully",
      });
      onClose();
      setFormData({
        name: "",
        email: "",
        phone: "",
        vehicle: "",
        license: "",
        zone: "",
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
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Add New Rider</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="vehicle">Vehicle Type</Label>
            <select
              id="vehicle"
              value={formData.vehicle}
              onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Vehicle</option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="Bicycle">Bicycle</option>
              <option value="Car">Car</option>
              <option value="Scooter">Scooter</option>
            </select>
          </div>

          <div>
            <Label htmlFor="license">License Number</Label>
            <Input
              id="license"
              value={formData.license}
              onChange={(e) => setFormData({ ...formData, license: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="zone">Zone</Label>
            <select
              id="zone"
              value={formData.zone}
              onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Zone</option>
              <option value="Downtown">Downtown</option>
              <option value="Uptown">Uptown</option>
              <option value="Suburbs">Suburbs</option>
              <option value="Central">Central</option>
              <option value="East Side">East Side</option>
              <option value="West Side">West Side</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Rider"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateRiderModal;