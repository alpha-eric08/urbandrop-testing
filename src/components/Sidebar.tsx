import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { unbandrop } from "@/assets/images";
import { helpItems, menuItems } from "@/assets/data/navLinks";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
}

export function Sidebar({ className = "", isCollapsed = false }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Helper function to find which menu item contains the current route
  const findActiveMenuItem = () => {
    const currentPath = location.pathname;
    return menuItems.find(item => 
      item.subItems?.some(subItem => subItem.href === currentPath)
    );
  };

  // Initialize expanded items based on current route
  const getInitialExpandedItems = () => {
    const activeItem = findActiveMenuItem();
    return activeItem ? [activeItem.id] : [];
  };

  const [expandedItems, setExpandedItems] = useState<string[]>(getInitialExpandedItems);
  const [isHelpExpanded, setIsHelpExpanded] = useState<boolean>(true);

  // Update expanded items when route changes
  useEffect(() => {
    const activeItem = findActiveMenuItem();
    if (activeItem && !expandedItems.includes(activeItem.id)) {
      setExpandedItems([activeItem.id]);
    }
  }, [location.pathname]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isExpanded = (itemId: string) => expandedItems.includes(itemId);

  // Check if a menu item is active based on current route
  const isMenuItemActive = (item: any) => {
    const currentPath = location.pathname;
    return item.subItems?.some((subItem: any) => subItem.href === currentPath);
  };

  // Check if a sub-item is active based on current route
  const isSubItemActive = (subItem: any) => {
    return location.pathname === subItem.href;
  };

  return (
    <motion.nav
      initial={{ x: -280, opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1, 
        width: isCollapsed ? 64 : 280 
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 z-[1026] flex flex-col overflow-hidden ${className}`}
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="h-20 flex items-center justify-center border-b border-gray-200 bg-white relative z-10 px-4"
      >
        <a href="/dashboard" className="flex items-center">
          <motion.img
            src={unbandrop}
            alt="UrbanDrop"
            title="UrbanDrop"
            className="rounded-sm"
            animate={{
              width: isCollapsed ? 32 : "auto",
              height: isCollapsed ? 32 : "auto"
            }}
            transition={{ duration: 0.3 }}
          />
        </a>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex-1 overflow-y-auto border-r border-gray-200 px-3 py-2.5 scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const expanded = isExpanded(item.id);
            const isActive = isMenuItemActive(item);

            return (
              <motion.li
                key={item.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                className="relative"
              >
                <motion.button
                  onClick={() => !isCollapsed && toggleExpanded(item.id)}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 text-left text-[13px] font-semibold rounded-md transition-all duration-300 ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onMouseEnter={(e) => {
                    if (isCollapsed) {
                      const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
                      if (tooltip) {
                        tooltip.style.opacity = '1';
                        tooltip.style.transform = 'translateX(0)';
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isCollapsed) {
                      const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
                      if (tooltip) {
                        tooltip.style.opacity = '0';
                        tooltip.style.transform = 'translateX(-10px)';
                      }
                    }
                  }}
                >
                  <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
                    <span className={`${isCollapsed ? '' : 'mr-3'} flex-shrink-0`}>{item.icon}</span>
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.title}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, rotate: expanded ? 90 : 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="text-gray-500"
                      >
                        <ChevronRight size={16} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="tooltip absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-50 opacity-0 transition-all duration-200 whitespace-nowrap pointer-events-none"
                         style={{ transform: 'translateY(-50%) translateX(-10px)' }}>
                      {item.title}
                      <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                    </div>
                  )}
                </motion.button>

                <AnimatePresence>
                  {!isCollapsed && expanded && item.subItems && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <motion.li
                          key={subItem.href}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -10, opacity: 0 }}
                          transition={{
                            delay: subIndex * 0.05,
                            duration: 0.2,
                          }}
                          className="ml-2.5 mt-1"
                        >
                          <motion.a
                            href={subItem.href}
                            className={`block px-5 py-2.5 text-[12.8px] font-semibold rounded-md transition-all duration-300 ${
                              isSubItemActive(subItem)
                                ? "bg-gray-100 text-gray-900 ml-9"
                                : "text-gray-600 hover:bg-gray-50 ml-9"
                            }`}
                            whileHover={{ scale: 1.01, x: 2 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            {subItem.title}
                          </motion.a>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>

      {/* Help Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="border-t border-gray-200 p-4 space-y-2"
      >
        {/* Help Section Header */}
        <AnimatePresence>
          {!isCollapsed ? (
            <motion.button
              onClick={() => setIsHelpExpanded(!isHelpExpanded)}
              className="w-full flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 hover:text-gray-700 transition-colors duration-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Help & Support
              <motion.span
                animate={{ rotate: isHelpExpanded ? 90 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="text-gray-500"
              >
                <ChevronRight size={12} />
              </motion.span>
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setIsHelpExpanded(!isHelpExpanded)}
              className="w-full flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-all duration-200 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onMouseEnter={(e) => {
                const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
                if (tooltip) {
                  tooltip.style.opacity = '1';
                  tooltip.style.transform = 'translateX(0)';
                }
              }}
              onMouseLeave={(e) => {
                const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
                if (tooltip) {
                  tooltip.style.opacity = '0';
                  tooltip.style.transform = 'translateX(-10px)';
                }
              }}
            >
              <motion.span
                animate={{ rotate: isHelpExpanded ? 90 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <ChevronRight size={16} />
              </motion.span>
              
              {/* Tooltip for collapsed state */}
              <div className="tooltip absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-50 opacity-0 transition-all duration-200 whitespace-nowrap pointer-events-none"
                   style={{ transform: 'translateY(-50%) translateX(-10px)' }}>
                Help & Support
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Help Items */}
        <AnimatePresence>
          {(isHelpExpanded || isCollapsed) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden space-y-1"
            >
              {helpItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={index}
                    onClick={() => navigate(item.path)}
                    whileHover={{ scale: 1.02, x: isCollapsed ? 0 : 2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center relative' : ''} px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-all duration-200`}
                    onMouseEnter={(e) => {
                      if (isCollapsed) {
                        const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
                        if (tooltip) {
                          tooltip.style.opacity = '1';
                          tooltip.style.transform = 'translateX(0)';
                        }
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isCollapsed) {
                        const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
                        if (tooltip) {
                          tooltip.style.opacity = '0';
                          tooltip.style.transform = 'translateX(-10px)';
                        }
                      }
                    }}
                  >
                    <Icon size={16} className={`text-gray-500 ${isCollapsed ? '' : 'mr-3'}`} />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    
                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="tooltip absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-50 opacity-0 transition-all duration-200 whitespace-nowrap pointer-events-none"
                           style={{ transform: 'translateY(-50%) translateX(-10px)' }}>
                        {item.label}
                        <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
}

export default Sidebar;
