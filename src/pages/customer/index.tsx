
import { useState } from "react";
import { Suspense, lazy } from "react";
import CustomerHeader from "./components/CustomerHeader";
import { useCustomers } from "@/hooks/useCustomers";
import CustomerStatsSkeleton from "./components/CustomerStatsSkeleton";
import CustomerTableSkeleton from "./components/CustomerTableSkeleton";

// Lazy load components
const CustomerStats = lazy(() => import("./components/CustomerStats"));
const CustomerTable = lazy(() => import("./components/CustomerTable"));

export default function Customers() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const customersHook = useCustomers();

  return (
    <div>
      <CustomerHeader 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        customers={customersHook.getFilteredCustomers(searchTerm, activeFilter)}
      />

      <div className="md:p-8 p-4">
        <Suspense fallback={<CustomerStatsSkeleton />}>
          <CustomerStats />
        </Suspense>
        
        <Suspense fallback={<CustomerTableSkeleton />}>
          <CustomerTable 
            customers={customersHook.getFilteredCustomers(searchTerm, activeFilter)}
            onDeleteCustomer={customersHook.deleteCustomer}
            onUpdateCustomer={customersHook.updateCustomer}
            onBlockCustomer={customersHook.blockCustomer}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Suspense>
      </div>
    </div>
  );
}
