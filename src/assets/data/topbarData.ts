
export const statusOptions = [
  { label: "Active", color: "bg-green-500" },
  { label: "Always", color: "bg-orange-400" },
  { label: "Busy", color: "bg-red-500" },
  { label: "Inactive", color: "bg-teal-500" },
  { label: "Disabled", color: "bg-gray-600" },
];

import { User, Activity, CreditCard, Bell, Settings } from "lucide-react";

export const menuItems = [
  { icon: User, label: "Profile Details", path: "/profile" },
  { icon: Activity, label: "Activity Feed", path: "/profile" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Settings, label: "Account Settings", path: "/profile" },
];
