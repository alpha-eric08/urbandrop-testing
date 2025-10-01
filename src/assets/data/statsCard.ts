import { ShoppingBag, Store, Truck, Users } from "lucide-react";

    export const statsCards = [
    {
      title: "Total Orders",
      value: "26,595",
      icon: ShoppingBag,
      bgColor: "bg-green-100 text-green-800",
      percentage: "36.85%",
    },
    {
      title: "Total Riders",
      value: "18,245",
      icon: Truck,
      bgColor: "bg-red-100 text-red-800",
      percentage: "24.12%",
    },
    {
      title: "Total Customers",
      value: "34,892",
      icon: Users,
      bgColor: "bg-gray-100 text-gray-800",
      percentage: "42.18%",
    },
    {
      title: "Total Merchants",
      value: "12,459",
      icon: Store,
      bgColor: "bg-blue-100 text-blue-800",
      percentage: "15.79%",
    },
  ];


interface ActivityTab {
  id: string;
  label: string;
  amount: string;
  deals: string;
}

    export const activityTabs: ActivityTab[] = [
    {
      id: "orders",
      label: "Orders",
      amount: "£47,569",
      deals: "57 Deals",
    },
    {
      id: "service",
      label: "Service Fee",
      amount: "£35,258",
      deals: "46 Deals",
    },
    {
      id: "delivery",
      label: "Delivery",
      amount: "£24,569",
      deals: "34 Deals",
    }
  ];
