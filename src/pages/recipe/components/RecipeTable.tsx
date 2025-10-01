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
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  Clock,
  Globe,
  ChevronLeft,
  ChevronRight,
  Youtube,
  Facebook,
  Smartphone,
} from "lucide-react";
import { Recipe as APIRecipe, COUNTRIES, Country, Ingredient, PreparationStep, SocialLinks } from "@/assets/data/recipe";
import { logo } from "@/assets/images";
import { convertDataUrlToBlobUrl } from "@/utils/imageUtils";

// Local interface that matches the component's data structure
interface LocalRecipe {
  id: string;
  name: string;
  image: string;
  estimatedTime: number;
  country: Country;
  ingredients: Ingredient[];
  preparationSteps: PreparationStep[];
  socialLinks: SocialLinks;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

interface RecipeTableProps {
  recipes: LocalRecipe[];
  onEdit: (recipe: LocalRecipe) => void;
  onDelete: (id: string) => void;
  onView: (recipe: LocalRecipe) => void;
  onCreateNew: () => void;
}

const RecipeTable: React.FC<RecipeTableProps> = ({
  recipes,
  onEdit,
  onDelete,
  onView,
  onCreateNew,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showActionDropdown, setShowActionDropdown] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns: ColumnDef<LocalRecipe>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Recipe",
        cell: ({ row }) => (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center bg-white">
              {row.original.image ? (
                <img
                  src={convertDataUrlToBlobUrl(row.original.image)}
                  alt={row.original.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <img src={logo} alt="" />
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => onView(row.original)}
                className="font-semibold text-slate-700 hover:text-slate-900 transition-colors text-left"
              >
                {row.original.name}
              </button>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {row.original.estimatedTime} min
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  <Globe className="w-3 h-3 mr-1" />
                  {row.original.country.flag} {row.original.country.name}
                </span>
              </div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "ingredients",
        header: "Ingredients",
        cell: ({ row }) => (
          <div className="max-w-xs">
            <span className="text-sm text-gray-600">
              {row.original.ingredients.length} ingredients
            </span>
            <div className="text-xs text-gray-500 mt-1 truncate">
              {row.original.ingredients.slice(0, 3).map(ing => ing.name).join(", ")}
              {row.original.ingredients.length > 3 && "..."}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "preparationSteps",
        header: "Steps",
        cell: ({ row }) => (
          <span className="text-sm text-gray-600">
            {row.original.preparationSteps.length} steps
          </span>
        ),
      },
      {
        accessorKey: "social_links",
        header: "Social Links",
        cell: ({ row }) => {
          const links = [];
          if (row.original.socialLinks.youtube) links.push({ type: "youtube", icon: Youtube, color: "text-red-600" });
          if (row.original.socialLinks.facebook) links.push({ type: "facebook", icon: Facebook, color: "text-blue-600" });
          if (row.original.socialLinks.tiktok) links.push({ type: "tiktok", icon: Smartphone, color: "text-black" });
          
          return (
            <div className="flex items-center gap-1">
              {links.length > 0 ? (
                links.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <Icon key={index} className={`w-4 h-4 ${link.color}`} />
                  );
                })
              ) : (
                <span className="text-xs text-gray-400">None</span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status || "draft";
          return (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => (
          <div className="text-sm text-gray-600">
            {new Date(row.original.createdAt).toLocaleDateString()}
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
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
                      View Recipe
                    </button>
                    <button
                      onClick={() => {
                        onEdit(row.original);
                        setShowActionDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors text-slate-700 flex items-center"
                    >
                      <Edit3 className="w-4 h-4 mr-3" />
                      Edit Recipe
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
                      Delete Recipe
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

  const table = useReactTable({
    data: recipes,
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
          <h2 className="text-xl font-bold text-gray-900">Recipes</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5cb35e] focus:border-transparent"
              />
            </div>
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
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
          of {table.getFilteredRowModel().rows.length} recipes
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

export default RecipeTable;