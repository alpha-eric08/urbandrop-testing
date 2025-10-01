import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MoreVertical, Eye, Trash2, Shield, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Customer } from "@/hooks/useCustomers";
import EditCustomerModal from "@/components/EditCustomerModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CustomerTableProps {
  customers: Customer[];
  onDeleteCustomer: (id: string) => void;
  onUpdateCustomer: (id: string, updates: Partial<Customer>) => void;
  onBlockCustomer: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function CustomerTable({
  customers,
  onDeleteCustomer,
  onUpdateCustomer,
  onBlockCustomer,
  searchTerm,
  setSearchTerm,
}: CustomerTableProps) {
  const navigate = useNavigate();
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination logic
  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = customers.slice(startIndex, endIndex);

  const getSubscriptionBadge = (status: string) => {
    return status === "Premium"
      ? "inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
      : "inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full";
  };

  const getAccountStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return "inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full";
      case "Pending":
        return "inline-flex px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full";
      case "Inactive":
        return "inline-flex px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full";
      case "Suspended":
        return "inline-flex px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full";
      default:
        return "inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full";
    }
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="bg-white pb-6 rounded-lg shadow-sm border border-gray-200"
    >
      
        {/* Table Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Customers</h3>
            <p className="text-sm text-gray-600">
              Review and manage customer accounts
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cust Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sub. Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acc. Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentCustomers.map((customer) => (
              <tr 
                key={customer.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/customers/${customer.id}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {customer.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {customer.id}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {customer.email}
                </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                   {customer.phone}
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                   {customer.joinDate}
                 </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={getSubscriptionBadge(
                      customer.subscriptionStatus
                    )}
                  >
                    {customer.subscriptionStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={getAccountStatusBadge(customer.accountStatus)}
                  >
                    {customer.accountStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <DropdownMenu>
                    <DropdownMenuTrigger 
                      asChild 
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                      <DropdownMenuItem 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/customers/${customer.id}`);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View User
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCustomer(customer);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer hover:bg-gray-50 text-orange-600 focus:text-orange-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          onBlockCustomer(customer.id);
                        }}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Block User
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer hover:bg-gray-50 text-red-600 focus:text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeletingCustomer(customer);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Edit Customer Modal */}
      <EditCustomerModal
        open={!!editingCustomer}
        onOpenChange={(open) => !open && setEditingCustomer(null)}
        customer={editingCustomer}
        onSave={onUpdateCustomer}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingCustomer} onOpenChange={(open) => !open && setDeletingCustomer(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Customer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deletingCustomer?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingCustomer) {
                  onDeleteCustomer(deletingCustomer.id);
                  setDeletingCustomer(null);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
