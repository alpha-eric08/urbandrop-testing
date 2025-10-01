import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Plus,
  Store,
} from "lucide-react";
import { Merchant } from "@/assets/data/merchantsData";

interface MerchantTableProps {
  merchants: Merchant[];
  onEdit: (merchant: Merchant) => void;
  onDelete: (id: string) => void;
  onView: (merchant: Merchant) => void;
  onCreateNew: () => void;
}

const MerchantTable: React.FC<MerchantTableProps> = ({
  merchants,
  onEdit,
  onDelete,
  onView,
  onCreateNew,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showActionDropdown, setShowActionDropdown] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [businessTypeFilter, setBusinessTypeFilter] = useState<string>("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getBusinessTypeColor = (type: string) => {
    const colors = {
      "Restaurant": "bg-orange-100 text-orange-800",
      "Grocery Store": "bg-green-100 text-green-800",
      "Pharmacy": "bg-blue-100 text-blue-800",
      "Electronics": "bg-purple-100 text-purple-800",
      "Clothing": "bg-pink-100 text-pink-800",
      "Other": "bg-gray-100 text-gray-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const columns: ColumnDef<Merchant>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Merchant ID",
        cell: ({ row }) => (
          <button
            onClick={() => onView(row.original)}
            className="font-mono text-sm text-slate-700 hover:text-slate-900 transition-colors font-semibold"
          >
            #{row.original.id}
          </button>
        ),
      },
      {
        accessorKey: "merchantName",
        header: "Merchant Name",
        cell: ({ row }) => (
            <div>
              <button
                onClick={() => onView(row.original)}
                className="font-semibold text-slate-700 hover:text-slate-900 transition-colors text-left"
              >
                {row.original.merchantName}
              </button>
              <div className="text-xs text-gray-500 flex items-center mt-1">
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  {row.original.businessType}
                </span>
              </div>
            </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <a
              href={`mailto:${row.original.email}`}
              className="text-slate-700 hover:text-[#5cb35e] transition-colors text-sm"
            >
              {row.original.email}
            </a>
          </div>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone Number",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <a
              href={`tel:${row.original.phone || ""}`}
              className="text-slate-700 hover:text-[#5cb35e] transition-colors text-sm"
            >
              {row.original.phone || "N/A"}
            </a>
          </div>
        ),
      },
      {
        accessorKey: "merchantAddress",
        header: "Merchant Address",
        cell: ({ row }) => (
          <div className="max-w-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm text-slate-700 line-clamp-2">
                  {row.original.merchantAddress}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {row.original.postCode}
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "postCode",
        header: "Post Code",
        cell: ({ row }) => (
          <span className="font-mono text-sm text-slate-700 bg-gray-50 px-2 py-1 rounded">
            {row.original.postCode}
          </span>
        ),
      },
      {
        accessorKey: "businessType",
        header: "Business Type",
        cell: ({ row }) => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBusinessTypeColor(row.original.businessType)}`}
          >
            {row.original.businessType}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(row.original.status)}`}
          >
            {row.original.status}
          </span>
        ),
      },
      {
        id: "merchantView",
        header: "Merchant View",
        cell: ({ row }) => (
          <div className="flex justify-end">
            <div className="relative">
              <button
                onClick={() =>
                  setShowActionDropdown(
                    showActionDropdown === row.original.id
                      ? null
                      : row.original.id,
                  )
                }
                className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <MoreVertical className="w-4 h-4 text-slate-600" />
              </button>

              {showActionDropdown === row.original.id && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                >
                  <div className="py-2">
                    <button
                      onClick={() => {
                        onView(row.original);
                        setShowActionDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors text-slate-700 flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-3" />
                      View Merchant
                    </button>
                    <button
                      onClick={() => {
                        onEdit(row.original);
                        setShowActionDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors text-slate-700 flex items-center"
                    >
                      <Edit3 className="w-4 h-4 mr-3" />
                      Edit Merchant
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={() => {
                        onDelete(row.original.id);
                        setShowActionDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors text-red-600 flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-3" />
                      Delete Merchant
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        ),
      },
    ],
    [showActionDropdown, onEdit, onDelete, onView],
  );

  const filteredMerchants = merchants.filter(merchant => {
    const matchesStatus = statusFilter === "all" || merchant.status === statusFilter;
    const matchesBusinessType = businessTypeFilter === "all" || merchant.businessType === businessTypeFilter;
    return matchesStatus && matchesBusinessType;
  });

  const table = useReactTable({
    data: filteredMerchants,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900">Merchants</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search merchants..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5cb35e] focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
                <option value="Inactive">Inactive</option>
                <option value="Rejected">Rejected</option>
              </select>
              <select
                value={businessTypeFilter}
                onChange={(e) => setBusinessTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <option value="all">All Types</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Grocery Store">Grocery Store</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
        <button
          onClick={onCreateNew}
          className="bg-[#5cb35e] text-white px-4 py-2 rounded-lg hover:bg-[#4a9f4d] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Merchant
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length,
          )}{" "}
          of {table.getFilteredRowModel().rows.length} merchants
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex items-center gap-1 px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex items-center gap-1 px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MerchantTable;
