import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Maximize2,
  Minimize2,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Activity,
  CreditCard,
} from "lucide-react";
import { profile } from "@/assets/images";
import { menuItems, statusOptions } from "@/assets/data/topbarData";
import { useAuthData, useLogout } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { formatTimeAgo, notifications } from "@/assets/data/notification";

interface TopBarProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  pageTitle?: string;
  className?: string;
  onSidebarToggle?: () => void;
  isSidebarCollapsed?: boolean;
}

export function TopBar({
  onMenuToggle,
  isMenuOpen = false,
  className = "",
  onSidebarToggle,
  isSidebarCollapsed = false,
}: TopBarProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("Active");
  const { user } = useAuthData();
  const logoutMutation = useLogout();

  const navigate = useNavigate();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-white top-0 sticky border-b border-gray-200 px-6 py-4 flex items-center justify-between z-50 ${className}`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-6">
        {/* Mobile Menu Toggle */}
        <motion.button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>

        {/* Sidebar Toggle - Desktop */}
        <motion.button
          onClick={onSidebarToggle}
          className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="flex flex-col space-y-1"
            animate={isSidebarCollapsed ? "collapsed" : "expanded"}
            variants={{
              expanded: {
                transition: { staggerChildren: 0.1 }
              },
              collapsed: {
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            <motion.div
              className="w-4 h-0.5 bg-gray-700 rounded"
              variants={{
                expanded: { rotate: 0, y: 0 },
                collapsed: { rotate: 45, y: 2 }
              }}
            />
            <motion.div
              className="w-4 h-0.5 bg-gray-700 rounded"
              variants={{
                expanded: { opacity: 1 },
                collapsed: { opacity: 0 }
              }}
            />
            <motion.div
              className="w-4 h-0.5 bg-gray-700 rounded"
              variants={{
                expanded: { rotate: 0, y: 0 },
                collapsed: { rotate: -45, y: -2 }
              }}
            />
          </motion.div>
        </motion.button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Fullscreen Toggle */}
        <motion.button
          onClick={toggleFullscreen}
          className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isFullscreen ? (
            <Minimize2 size={20} className="text-gray-600" />
          ) : (
            <Maximize2 size={20} className="text-gray-600" />
          )}
        </motion.button>

        {/* Notifications */}
        <div className="relative">
          <motion.button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} className="text-gray-600" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
              >
                {unreadCount}
              </motion.span>
            )}
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 md:w-80 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-200">
                  <h6 className="font-bold text-gray-900">Notifications</h6>
                  <button className="text-green-600 text-sm font-semibold hover:text-green-700 transition-colors">
                    Mark as Read
                  </button>
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <img
                        src={notification.user.avatar}
                        alt={notification.user.name}
                        className="w-12 h-12 rounded border mr-3 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          <span className="font-semibold">
                            {notification.user.name}
                          </span>{" "}
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500 border-b border-dashed border-gray-300">
                            {formatTimeAgo(new Date(notification.timestamp))}
                          </span>
                          <div className="flex items-center gap-2">
                            <button className="w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors"></button>
                            <button className="text-red-500 hover:text-red-600 transition-colors">
                              <X size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 text-center">
                  <a href="/notifications">
                  <button className="text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors">
                    All Notifications
                  </button>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile */}
        <div className="relative">
          <motion.button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={profile}
              alt="User Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-200"
            />
            <ChevronDown size={16} className="text-gray-500" />
          </motion.button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
              >
                {/* User Info */}
                <div className="flex items-center p-5 border-b border-gray-200">
                  <img
                    src={profile}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full border-2 border-gray-200 mr-3"
                  />
                  <div>
                    <h6 className="font-bold text-gray-900 flex items-center gap-2">
                      {user?.full_name || "Admin User"}
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                        PRO
                      </span>
                    </h6>
                    <span className="text-sm text-gray-600">
                      {user?.email || "admin@urbandrop.com"}
                    </span>
                  </div>
                </div>

                {/* Status Selector */}
                <div className="p-3">
                  <div className="relative">
                    <button
                      onClick={() => setShowStatusMenu(!showStatusMenu)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-semibold">
                          {currentStatus}
                        </span>
                      </div>
                      <ChevronDown size={16} className="text-gray-500" />
                    </button>

                    <AnimatePresence>
                      {showStatusMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                        >
                          {statusOptions.map((status) => (
                            <button
                              key={status.label}
                              onClick={() => {
                                setCurrentStatus(status.label);
                                setShowStatusMenu(false);
                              }}
                              className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 transition-colors text-left"
                            >
                              <div
                                className={`w-2.5 h-2.5 rounded-full ${status.color}`}
                              ></div>
                              <span className="text-sm font-semibold">
                                {status.label}
                              </span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="border-t border-gray-200">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={index}
                        onClick={() => navigate(item.path)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="w-full flex items-center gap-3 p-3 mx-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        whileHover={{ x: 2 }}
                      >
                        <Icon size={16} className="text-gray-600" />
                        <span className="text-sm font-semibold text-gray-900">
                          {item.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Logout */}
                <div className="border-t border-gray-200 p-2">
                  <motion.button
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors text-left text-red-600 disabled:opacity-50"
                    whileHover={{ x: 2 }}
                  >
                    <LogOut size={16} />
                    <span className="text-sm font-semibold">
                      {logoutMutation.isPending ? "Logging out..." : "Logout"}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
            setShowStatusMenu(false);
          }}
        />
      )}
    </motion.div>
  );
}

export default TopBar;
