import {
  LayoutDashboard,
  Users,
  UserCog,
  Store,
  Bike,
  ShoppingCart,
  Gift,
  ChefHat,
  Building2,
  HelpCircle, MessageCircle, Book, Phone,
  User,
  ImageIcon,
  Folder,
} from "lucide-react";

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  href?: string;
  subItems?: {
    title: string;
    href: string;
  }[];
}

export const menuItems: MenuItem[] = [
  {
    id: "dashboards",
    title: "Dashboards",
    icon: <LayoutDashboard size={18} />,
    subItems: [{ title: "Overview", href: "/dashboard" }],
  },
  {
    id: "customers",
    title: "Customers",
    icon: <Users size={18} />,
    subItems: [{ title: "Customers", href: "/customers" }],
  },
  {
    id: "merchants",
    title: "Merchants",
    icon: <Building2 size={18} />,
    subItems: [{ title: "Merchants", href: "/merchants" }],
  },
  {
    id: "riders",
    title: "Riders",
    icon: <Bike size={18} />,
    subItems: [
      { title: "Riders", href: "/riders" },
      { title: "Riders View", href: "/riders/view" },
    ],
  },
  {
    id: "orders",
    title: "Orders",
    icon: <ShoppingCart size={18} />,
    subItems: [
      { title: "Orders", href: "/orders" },
      { title: "Orders Create", href: "/orders/create" },
    ],
  },
  {
    id: "promotions",
    title: "Promotions",
    icon: <Gift size={18} />,
    subItems: [{ title: "Promotion View", href: "/promotions" }],
  },
  {
    id: "recipe",
    title: "Recipe",
    icon: <ChefHat size={18} />,
    subItems: [{ title: "Recipe Management", href: "/recipes" }],
  },
  {
    id: "users",
    title: "Users",
    icon: <UserCog size={18} />,
    subItems: [{ title: "Users Management", href: "/users" }],
  },
  {
    id: "banners",
    title: "Banner Management",
    icon: <ImageIcon size={18} />,
    subItems: [{ title: "Manage Banners", href: "/banners" }],
  },
  {
    id: "categories",
    title: "Product Categories",
    icon: <Folder size={18} />,
    subItems: [{ title: "Manage Categories", href: "/categories" }],
  },
  {
    id: "help",
    title: "Help & Support",
    icon: <HelpCircle size={18} />,
    subItems: [
      { title: "Notifications", href: "/notifications" },
      { title: "Help Center", href: "/help-center" },
      { title: "Contact Support", href: "/contact-support" },
      { title: "Documentation", href: "/documentation" },
    ],
  },
  {
    id: "profile",
    title: "Profile",
    icon: <User size={18} />,
    subItems: [{ title: "Profile Details", href: "/profile" }],
  },
];


export const helpItems = [
  { label: 'Help Center', icon: HelpCircle, path: '/help-center' },
  { label: 'Notifications', icon: MessageCircle, path: '/notifications' },
  { label: 'Documentation', icon: Book, path: '/documentation' },
  { label: 'Contact Support', icon: Phone, path: '/contact-support' },
];