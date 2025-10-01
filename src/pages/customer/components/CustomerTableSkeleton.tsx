
import { TableLoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function CustomerTableSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-[300px] bg-gray-100 rounded-md animate-pulse" />
            <div className="h-10 w-[120px] bg-gray-100 rounded-md animate-pulse" />
          </div>
          <div className="h-10 w-[100px] bg-gray-100 rounded-md animate-pulse" />
        </div>
        <TableLoadingSkeleton rows={8} />
        <div className="flex items-center justify-between mt-6">
          <div className="h-4 w-[200px] bg-gray-100 rounded animate-pulse" />
          <div className="flex items-center space-x-2">
            <div className="h-8 w-[80px] bg-gray-100 rounded animate-pulse" />
            <div className="h-8 w-[80px] bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
