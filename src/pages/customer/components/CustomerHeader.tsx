import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  FileText,
  Download,
  Plus,
  Filter,
  Printer,
} from "lucide-react";
import CreateCustomerModal from "@/components/CreateCustomerModal";
import { Customer } from "@/hooks/useCustomers";
import { exportToCSV, exportToJSON, exportToXML, exportToTXT, printCustomers } from "@/utils/exportUtils";

interface CustomerHeaderProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  customers: Customer[];
}

export default function CustomerHeader({ 
  activeFilter, 
  setActiveFilter, 
  searchTerm, 
  setSearchTerm, 
  customers 
}: CustomerHeaderProps) {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filterOptions = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "inactive", label: "Inactive" },
    { id: "pending", label: "Pending" },
    { id: "suspended", label: "Suspended" },
    { id: "premium", label: "Premium" },
    { id: "basic", label: "Basic" },
  ];

  const handleExport = (format: string) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `customers_${timestamp}`;
    
    switch (format) {
      case 'csv':
        exportToCSV(customers, filename);
        break;
      case 'json':
        exportToJSON(customers, filename);
        break;
      case 'xml':
        exportToXML(customers, filename);
        break;
      case 'text':
        exportToTXT(customers, filename);
        break;
      case 'print':
        printCustomers(customers);
        break;
    }
    setShowExportDropdown(false);
  };

  const exportOptions = [
    { id: "csv", label: "CSV", icon: FileText },
    { id: "json", label: "JSON", icon: FileText },
    { id: "xml", label: "XML", icon: FileText },
    { id: "text", label: "Text", icon: FileText },
    { id: "print", label: "Print", icon: Printer },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-sm border-b border-gray-200 px-8 py-4"
      >
        <div className="flex items-center justify-between">
          {/* Left side - Breadcrumb and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-slate-700 border-r border-gray-300 pr-4">
                Customers
              </h2>
              <nav className="md:flex hidden items-center space-x-2 text-sm">
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-800 font-medium transition-colors"
                >
                  Home &gt;
                </a>
                <span className="text-gray-400 opacity-75">Customers</span>
              </nav>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-3">
            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex  items-center justify-center md:px-4 py-2 px-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4 md:mr-2" />
                <span className="md:block hidden">Filter</span>
                <ChevronDown className="w-4 md:block hidden h-4 ml-2" />
              </button>

              {showFilterDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                >
                  <div className="py-2">
                    {filterOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          setActiveFilter(option.id);
                          setShowFilterDropdown(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                          activeFilter === option.id
                            ? "bg-gray-50 text-green-600 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Export Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowExportDropdown(!showExportDropdown)}
                className="flex items-center justify-center md:px-4 py-2 px-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4 md:mr-2" />
                <span className="hidden md:block">Export</span>
                <ChevronDown className="w-4 h-4 hidden md:block ml-2" />
              </button>

              {showExportDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                >
                  <div className="py-2">
                     {exportOptions.map((option) => (
                       <button
                         key={option.id}
                         onClick={() => handleExport(option.id)}
                         className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors text-gray-700 flex items-center"
                       >
                         <option.icon className="w-4 h-4 mr-3" />
                         {option.label}
                       </button>
                     ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Create Customer Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white text-sm font-bold uppercase tracking-wide rounded-md hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create <span className="hidden md:block">Customer</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Click outside to close dropdowns */}
      {(showFilterDropdown || showExportDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowFilterDropdown(false);
            setShowExportDropdown(false);
          }}
        />
      )}

      {/* Create Customer Modal */}
      <CreateCustomerModal 
        open={showCreateModal} 
        onOpenChange={setShowCreateModal} 
      />
    </>
  );
}