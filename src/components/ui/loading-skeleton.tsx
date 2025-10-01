
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  rows?: number;
  showAvatar?: boolean;
}

export function LoadingSkeleton({ className, rows = 3, showAvatar = false }: LoadingSkeletonProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          {showAvatar && <Skeleton className="h-12 w-12 rounded-full" />}
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableLoadingSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-8 w-[80px]" />
        </div>
      ))}
    </div>
  );
}

export function StatsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-8 w-[80px]" />
            </div>
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CardLoadingSkeleton({ count = 1 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <div className="flex justify-end space-x-2">
              <Skeleton className="h-8 w-[80px]" />
              <Skeleton className="h-8 w-[80px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
