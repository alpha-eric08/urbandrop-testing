import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Check,
  X,
  Edit3,
  Trash2,
  Eye,
  MoreVertical,
  Clock,
  Shield,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { customerOrders } from "@/assets/data/customerOrders";
import EditCustomerModal from "@/components/EditCustomerModal";
import { useCustomers } from "@/hooks/useCustomers";

// Interfaces
interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: any;
  phone: string;
  location: string;
  country: string;
  website: string;
  subscribed: boolean;
  dateOfBirth: string;
  orderCount: number;
  orderValue: string;
  joinDate: string;
}

interface OrderHistory {
  id: string;
  date: string;
  amount: string;
  status: "completed" | "pending" | "rejected";
}

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  date: string;
  link?: string;
  action?: string;
}

interface LoginLog {
  id: string;
  browser: string;
  ip: string;
  time: string;
  date: string;
  status: "success" | "failed";
}


const orderHistory: OrderHistory[] = [
  { id: "#258963", date: "02 NOV, 2022", amount: "$350", status: "completed" },
  { id: "#987456", date: "05 DEC, 2022", amount: "$590", status: "pending" },
  { id: "#456321", date: "31 NOV, 2022", amount: "$450", status: "rejected" },
  { id: "#357951", date: "03 JAN, 2023", amount: "$250", status: "completed" },
];

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "Order",
    description: "Reynante placed new order",
    date: "April 19, 2023",
    link: "#456987",
    action: "New order placed",
  },
  {
    id: "2",
    type: "Group",
    description: "5+ friends join this group",
    date: "April 20, 2023",
    link: "Duralux",
    action: "Joined the group",
  },
  {
    id: "3",
    type: "Friend Request",
    description: "Socrates send you friend request",
    date: "April 21, 2023",
    action: "New friend request",
  },
  {
    id: "4",
    type: "Deposit",
    description: "Reynante make deposit $565 USD",
    date: "April 22, 2023",
    link: "$565 USD",
    action: "Make deposit",
  },
];

const loginLogs: LoginLog[] = [
  {
    id: "1",
    browser: "Chrome on Window",
    ip: "192.149.122.128",
    time: "11:34 PM",
    date: "Today",
    status: "success",
  },
  {
    id: "2",
    browser: "Mozilla on Window",
    ip: "186.188.154.225",
    time: "10:34 PM",
    date: "Nov 20, 2023",
    status: "failed",
  },
  {
    id: "3",
    browser: "Chrome on iMac",
    ip: "192.149.122.128",
    time: "04:16 PM",
    date: "Oct 23, 2023",
    status: "failed",
  },
  {
    id: "4",
    browser: "Chrome on Window",
    ip: "192.149.122.128",
    time: "04:12 AM",
    date: "Oct 03, 2023",
    status: "failed",
  },
];

const CustomerDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [showEditModal, setShowEditModal] = useState(false);
  const { customers, updateCustomer } = useCustomers();
  
  // Find customer data based on the route parameter
  const customerData = useMemo(() => {
    return customers.find(customer => customer.id === id);
  }, [customers, id]);

  // Get customer orders
  const orders = useMemo(() => {
    return id ? customerOrders[id] || [] : [];
  }, [id]);

  // If customer not found, show error
  if (!customerData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Customer Not Found</h1>
          <p className="text-gray-600 mb-6">The customer you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/customers")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Back to Customers
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate("/customers")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Customers
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Customer Details</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Customer Profile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {/* Avatar and Basic Info */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <img
                    src={customerData.avatar}
                    alt={customerData.name}
                    className="w-24 h-24 rounded-full border-4 border-gray-200"
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {customerData.name}
                </h2>
                <p className="text-gray-600 text-sm">{customerData.email}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 border border-dashed border-gray-200 rounded">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    Order Count
                  </h3>
                  <p className="text-2xl font-bold text-[#5cb35e]">
                    {customerData.orderCount || orders.length}
                  </p>
                </div>
                <div className="text-center p-3 border border-dashed border-gray-200 rounded">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    Order Value
                  </h3>
                  <p className="text-2xl font-bold text-[#5cb35e]">
                    {customerData.orderValue}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-3" />
                    <span>Location</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {customerData.location}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-3" />
                    <span>Phone</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {customerData.phone}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-3" />
                    <span>Email</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {customerData.email}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Check className="w-4 h-4 mr-3" />
                    <span>Status</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {customerData.accountStatus}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
                <button 
                  onClick={() => setShowEditModal(true)}
                  className="flex-1 bg-[#5cb35e] text-white py-2 px-4 rounded text-sm font-semibold hover:bg-[#4a9f4d] transition-colors flex items-center justify-center"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Tabbed Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-lg shadow-sm border">
              {/* Tab Headers */}
              <div className="border-b border-[#5cb35e] bg-green-50">
                <button className="px-6 py-4 text-sm font-semibold border-b-2 transition-colors">
                  Overview
                </button>
              </div>

              {/* Overview Content */}
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">
                      Profile Details
                    </h3>
                <button 
                  onClick={() => setShowEditModal(true)}
                  className="text-sm font-semibold text-gray-600 border border-gray-200 px-3 py-1 rounded hover:bg-gray-50 transition-colors"
                >
                      Edit Profile
                    </button>
                  </div>

                  <div className="grid grid-cols-1">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Full Name:</span>
                        <span className="font-semibold">
                          {customerData.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date of Birth:</span>
                        <span className="font-semibold">
                          {customerData.dateOfBirth}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mobile Number:</span>
                        <span className="font-semibold">
                          {customerData.phone}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email Address:</span>
                        <span className="font-semibold">
                          {customerData.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-semibold">
                          {customerData.location}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Country:</span>
                        <span className="font-semibold">
                          {customerData.country}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Website:</span>
                        <span className="font-semibold">
                          {customerData.website}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Member Since:</span>
                        <span className="font-semibold">
                          {customerData.joinDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* bottom Column - Tabbed Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mt-6"
        >
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Tab Headers */}
            <div className="border-b">
              <nav className="flex">
                {[
                  { id: "orders", label: "Orders" },
                  { id: "activity", label: "Activity" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-[#5cb35e] text-[#5cb35e] bg-green-50"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "orders" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">
                      Orders History
                    </h3>
                    <button className="text-sm font-semibold text-gray-600 border border-gray-200 px-3 py-1 rounded hover:bg-gray-50 transition-colors">
                      All History
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">
                            ID
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">
                            Date
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">
                            Amount
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">
                            Status
                          </th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900 text-sm">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.length > 0 ? orders.map((order) => (
                          <tr
                            key={order.id}
                            className="border-b border-gray-100"
                          >
                            <td className="py-3 px-4">
                              <span className="font-semibold text-gray-900">
                                {order.orderNumber}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {order.date}
                            </td>
                            <td className="py-3 px-4 text-gray-900">
                              ${order.amount}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                  order.status.toLowerCase()
                                )}`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button className="p-1 text-gray-400 hover:text-gray-600">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-gray-600">
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-gray-600">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-gray-500">
                              No orders found for this customer
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === "activity" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">
                      Recent Activity
                    </h3>
                    <button className="text-sm font-semibold text-gray-600 border border-gray-200 px-3 py-1 rounded hover:bg-gray-50 transition-colors">
                      View All
                    </button>
                  </div>

                  <div className="space-y-4 mb-8">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="border-l-2 border-dashed border-gray-200 pl-6 relative"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">
                              <span>{activity.description}</span>
                              <span className="text-xs text-gray-500 ml-2">
                                [{activity.date}]
                              </span>
                            </p>
                            <p className="font-semibold text-gray-900">
                              {activity.action}
                              {activity.link && (
                                <span className="text-[#5cb35e] ml-1">
                                  {activity.link}
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <button className="w-5 h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50">
                              <Check className="w-3 h-3 text-gray-400" />
                            </button>
                            <button className="w-5 h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50">
                              <Eye className="w-3 h-3 text-gray-400" />
                            </button>
                            <button className="w-5 h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50">
                              <MoreVertical className="w-2 h-2 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="border-gray-200" />

                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-900">
                        Login History
                      </h4>
                      <button className="text-sm font-semibold text-gray-600 border border-gray-200 px-3 py-1 rounded hover:bg-gray-50 transition-colors">
                        View All
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">
                              Browser
                            </th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-900 text-sm">
                              IP
                            </th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-900 text-sm">
                              Time
                            </th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-900 text-sm">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {loginLogs.map((log) => (
                            <tr
                              key={log.id}
                              className="border-b border-gray-100"
                            >
                              <td className="py-3 px-4 font-medium text-gray-900">
                                {log.browser}
                              </td>
                              <td className="py-3 px-4 text-center text-gray-600">
                                {log.ip}
                              </td>
                              <td className="py-3 px-4 text-center text-gray-600">
                                <span>{log.date} </span>
                                <span className="block text-sm">
                                  {log.time}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                {log.status === "success" ? (
                                  <Check className="w-4 h-4 text-green-500 mx-auto" />
                                ) : (
                                  <X className="w-4 h-4 text-red-500 mx-auto" />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Edit Customer Modal */}
      <EditCustomerModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        customer={customerData}
        onSave={updateCustomer}
      />
    </div>
  );
};

export default CustomerDetail;
