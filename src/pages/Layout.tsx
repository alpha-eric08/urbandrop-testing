import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/Topbar";
import { useState } from "react";

import { Outlet } from "react-router-dom";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`lg:block ${isSidebarOpen ? "block" : "hidden"}`}>
        <Sidebar isCollapsed={isSidebarCollapsed} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className={`transition-all duration-300 ${
        isSidebarCollapsed ? "lg:ml-[64px]" : "lg:ml-[280px]"
      }`}>
        {/* TopBar */}
        <TopBar
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isMenuOpen={isSidebarOpen}
          pageTitle="Dashboard"
          onSidebarToggle={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <Outlet />
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
