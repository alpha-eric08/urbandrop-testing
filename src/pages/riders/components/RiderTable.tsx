import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Trash2, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRiders } from "@/hooks/useRiders";
import { getStatusColor } from "@/assets/data/ridersData";
import CreateRiderModal from "./CreateRiderModal";
import EditRiderModal from "./EditRiderModal";
import { useToast } from "@/hooks/use-toast";

const RiderTable = () => {
  const { riders, deleteRider } = useRiders();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRider, setSelectedRider] = useState<any>(null);

  const filteredRiders = riders.filter(rider => {
    const matchesSearch = rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rider.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || rider.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this rider?")) {
      const result = await deleteRider(id);
      if (result.success) {
        toast({
          title: "Success",
          description: "Rider deleted successfully",
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

  const handleEdit = (rider: any) => {
    setSelectedRider(rider);
    setIsEditModalOpen(true);
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
          <h2 className="text-xl font-semibold text-gray-900">All Riders</h2>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search riders..."
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
              <option value="suspended">Suspended</option>
            </select>
            
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Rider
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
                Rider
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Vehicle & License
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Performance
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
            {filteredRiders.map((rider, index) => (
              <motion.tr
                key={rider.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={rider.avatar}
                      alt={rider.name}
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{rider.name}</div>
                      <div className="text-sm text-gray-500">ID: {rider.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{rider.email}</div>
                  <div className="text-sm text-gray-500">{rider.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{rider.vehicle}</div>
                  <div className="text-sm text-gray-500">{rider.license}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{rider.deliveries} deliveries</div>
                  <div className="text-sm text-gray-500">★ {rider.rating}/5.0</div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={getStatusColor(rider.status)}>
                    {rider.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(rider)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(rider.id)}
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
      <CreateRiderModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      
      {selectedRider && (
        <EditRiderModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedRider(null);
          }}
          rider={selectedRider}
        />
      )}
    </motion.div>
  );
};

export default RiderTable;