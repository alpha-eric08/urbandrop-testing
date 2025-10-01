
import { Suspense, ReactNode } from "react";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

export default function LazyWrapper({ 
  children, 
  fallback = <LoadingSkeleton rows={5} showAvatar />,
  className 
}: LazyWrapperProps) {
  return (
    <div className={className}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </div>
  );
}
