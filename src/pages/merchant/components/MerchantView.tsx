import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Store,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Star,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  FileText,
  Download,
  Edit3,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building,
  CreditCard,
  MessageSquare,
} from "lucide-react";
import { Merchant } from "@/assets/data/merchantsData";
import { supportTickets } from "@/assets/data/supportTickets";

interface MerchantViewProps {
  merchant: Merchant;
  onClose: () => void;
  onEdit: (merchant: Merchant) => void;
}

const MerchantView: React.FC<MerchantViewProps> = ({ merchant, onClose, onEdit }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "Pending":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "Suspended":
      case "Rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Suspended":
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatOperatingHours = (hours: any) => {
    if (!hours) return "Not specified";
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const openDays = days.filter(day => hours[day]?.isOpen);
    
    if (openDays.length === 0) return "Closed";
    if (openDays.length === 7) return "Open daily";
    
    return `Open ${openDays.length} days a week`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[1030]"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-6xl max-h-[90vh] overflow-hidden w-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#5cb35e] flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{merchant.merchantName}</h2>
              <div className="flex items-center gap-2 mt-1">
                {getStatusIcon(merchant.status)}
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(merchant.status)}`}>
                  {merchant.status}
                </span>
                <span className="text-gray-500 text-sm">ID: #{merchant.id}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(merchant)}
              className="p-2 text-gray-400 hover:text-[#5cb35e] transition-colors"
            >
              <Edit3 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
          {/* Quick Stats */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 text-yellow-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      N/A
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-8 h-8 text-blue-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {merchant.totalOrders?.toLocaleString() || "0"}
                    </div>
                    <div className="text-sm text-gray-600">Total Orders</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {merchant.totalRevenue ? formatCurrency(merchant.totalRevenue) : "$0"}
                    </div>
                    <div className="text-sm text-gray-600">Total Revenue</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-purple-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {merchant.joinDate || "N/A"}
                    </div>
                    <div className="text-sm text-gray-600">Join Date</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex px-6">
              {[
                { id: "overview", label: "Overview", icon: Store },
                { id: "business", label: "Business Details", icon: Building },
                { id: "contact", label: "Contact & Hours", icon: Phone },
                { id: "documents", label: "Documents", icon: FileText },
                { id: "support", label: "Support", icon: MessageSquare },
                { id: "orders", label: "Orders", icon: ShoppingBag },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-[#5cb35e] text-[#5cb35e]"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Business Type:</span>
                        <span className="font-medium">{merchant.businessType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <a href={`mailto:${merchant.email}`} className="font-medium text-[#5cb35e] hover:underline">
                          {merchant.email}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <a href={`tel:${merchant.phone || ""}`} className="font-medium text-[#5cb35e] hover:underline">
                          {merchant.phone || "N/A"}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Address:</span>
                        <span className="font-medium text-right max-w-xs">{merchant.merchantAddress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Post Code:</span>
                        <span className="font-medium font-mono">{merchant.postCode}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Business Description</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        No description provided.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "business" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Registration Details</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Registration Number:</span>
                        <span className="font-medium font-mono">
                          Not provided
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax ID:</span>
                        <span className="font-medium font-mono">
                          Not provided
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Business Type:</span>
                        <span className="font-medium">{merchant.businessType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Bank Details
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">No bank details provided</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "contact" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <a href={`mailto:${merchant.email}`} className="text-[#5cb35e] hover:underline">
                          {merchant.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <a href={`tel:${merchant.phone || ""}`} className="text-[#5cb35e] hover:underline">
                          {merchant.phone || "N/A"}
                        </a>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <div>{merchant.merchantAddress}</div>
                          <div className="text-sm text-gray-600">{merchant.postCode}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Operating Hours
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        Not specified
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "documents" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">Document Management</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">File Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">File</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date & Time</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">Business License</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-blue-600 hover:underline cursor-pointer">business_license.pdf</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">2024-01-15 10:30 AM</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Approved
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="p-1 text-gray-400 hover:text-[#5cb35e] transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">Tax Certificate</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-blue-600 hover:underline cursor-pointer">tax_certificate.pdf</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">2024-01-12 02:15 PM</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="p-1 text-gray-400 hover:text-[#5cb35e] transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "support" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">Support Tickets</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Subject</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Priority</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Channel</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Created</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {supportTickets.filter(t => t.entityType === 'merchant' && t.entityId === merchant.id).map(t => (
                        <tr key={t.id}>
                          <td className="px-4 py-3 text-sm text-gray-900 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-gray-400" />
                            {t.subject}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              { low: 'bg-green-100 text-green-800', medium: 'bg-yellow-100 text-yellow-800', high: 'bg-orange-100 text-orange-800', urgent: 'bg-red-100 text-red-800' }[t.priority]
                            }`}>
                              {t.priority}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              { open: 'bg-blue-100 text-blue-800', in_progress: 'bg-purple-100 text-purple-800', resolved: 'bg-green-100 text-green-800', closed: 'bg-gray-100 text-gray-800' }[t.status]
                            }`}>
                              {t.status.replace('_',' ')}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm uppercase">{t.channel}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{new Date(t.created_at).toLocaleString()}</td>
                        </tr>
                      ))}
                      {supportTickets.filter(t => t.entityType === 'merchant' && t.entityId === merchant.id).length === 0 && (
                        <tr>
                          <td className="px-4 py-6 text-sm text-gray-600" colSpan={5}>No support tickets for this merchant.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Order ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Customer</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm font-mono text-blue-600">#ORD-001</td>
                        <td className="px-4 py-3 text-sm text-gray-900">John Doe</td>
                        <td className="px-4 py-3 text-sm text-gray-600">2024-01-20</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">$45.99</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-mono text-blue-600">#ORD-002</td>
                        <td className="px-4 py-3 text-sm text-gray-900">Jane Smith</td>
                        <td className="px-4 py-3 text-sm text-gray-600">2024-01-19</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">$32.50</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Processing
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-mono text-blue-600">#ORD-003</td>
                        <td className="px-4 py-3 text-sm text-gray-900">Mike Johnson</td>
                        <td className="px-4 py-3 text-sm text-gray-600">2024-01-18</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">$78.25</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Delivered
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MerchantView;
