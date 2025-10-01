import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRiders } from "@/hooks/useRiders";
import { useToast } from "@/hooks/use-toast";
import { Rider } from "@/assets/data/ridersData";

interface EditRiderModalProps {
  isOpen: boolean;
  onClose: () => void;
  rider: Rider;
}

const EditRiderModal = ({ isOpen, onClose, rider }: EditRiderModalProps) => {
  const { updateRider, isLoading } = useRiders();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: rider.name,
    email: rider.email,
    phone: rider.phone,
    vehicle: rider.vehicle,
    license: rider.license,
    zone: rider.zone,
    status: rider.status,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await updateRider(rider.id, {
      ...formData,
      lastActive: new Date().toISOString(),
    });
    
    if (result.success) {
      toast({
        title: "Success",
        description: "Rider updated successfully",
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
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Edit Rider</h2>
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
              <option value="Downtown">Downtown</option>
              <option value="Uptown">Uptown</option>
              <option value="Suburbs">Suburbs</option>
              <option value="Central">Central</option>
              <option value="East Side">East Side</option>
              <option value="West Side">West Side</option>
            </select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Rider"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditRiderModal;