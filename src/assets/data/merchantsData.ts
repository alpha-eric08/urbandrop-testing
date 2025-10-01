export interface Merchant {
  id: string;
  merchantName: string;
  email: string;
  phone: string;
  merchantAddress: string;
  postCode: string;
  businessType: string;
  status: "Active" | "Inactive" | "Pending";
  joinDate: string;
  website?: string;
  country: string;
  totalOrders: number;
  totalRevenue: number;
}

export interface MerchantFileUpload {
  id: string;
  merchantId: string;
  nameOfUpload: string;
  uploadedData: string;
  uploadDate: string;
}

export interface MerchantOrder {
  id: string;
  merchantId: string;
  orderID: string;
  date: string;
  customerName: string;
  amount: number;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
}

export interface MerchantProduct {
  id: string;
  merchantId: string;
  productName: string;
  description: string;
  category: string;
  tags: string[];
  unit: string;
  price: number;
}

export const merchantsData: Merchant[] = [
  {
    id: "MCH001",
    merchantName: "TechStore Pro",
    email: "contact@techstorepro.com",
    phone: "+1234567890",
    merchantAddress: "123 Tech Street, Silicon Valley",
    postCode: "94102",
    businessType: "Electronics",
    status: "Active",
    joinDate: "2023-01-15",
    website: "https://techstorepro.com",
    country: "USA",
    totalOrders: 150,
    totalRevenue: 45000,
  },
  {
    id: "MCH002",
    merchantName: "Fashion Hub",
    email: "info@fashionhub.com",
    phone: "+1234567891",
    merchantAddress: "456 Fashion Ave, New York",
    postCode: "10001",
    businessType: "Fashion & Apparel",
    status: "Active",
    joinDate: "2023-02-20",
    website: "https://fashionhub.com",
    country: "USA",
    totalOrders: 200,
    totalRevenue: 30000,
  },
  {
    id: "MCH003",
    merchantName: "Food Paradise",
    email: "orders@foodparadise.com",
    phone: "+1234567892",
    merchantAddress: "789 Food Court, Los Angeles",
    postCode: "90210",
    businessType: "Food & Beverage",
    status: "Pending",
    joinDate: "2023-03-10",
    country: "USA",
    totalOrders: 80,
    totalRevenue: 15000,
  },
];

export const merchantFileUploads: MerchantFileUpload[] = [
  {
    id: "FILE001",
    merchantId: "MCH001",
    nameOfUpload: "Product Catalog 2024",
    uploadedData: "product_catalog_2024.pdf",
    uploadDate: "2024-01-15",
  },
  {
    id: "FILE002",
    merchantId: "MCH001",
    nameOfUpload: "Business License",
    uploadedData: "business_license.pdf",
    uploadDate: "2024-01-10",
  },
];

export const merchantOrders: MerchantOrder[] = [
  {
    id: "ORD001",
    merchantId: "MCH001",
    orderID: "ORD-2024-001",
    date: "2024-01-20",
    customerName: "John Smith",
    amount: 299.99,
    status: "Completed",
  },
  {
    id: "ORD002",
    merchantId: "MCH001",
    orderID: "ORD-2024-002",
    date: "2024-01-21",
    customerName: "Sarah Johnson",
    amount: 149.50,
    status: "Processing",
  },
];

export const merchantProducts: MerchantProduct[] = [
  {
    id: "PROD001",
    merchantId: "MCH001",
    productName: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    category: "Electronics",
    tags: ["wireless", "audio", "headphones"],
    unit: "piece",
    price: 199.99,
  },
  {
    id: "PROD002",
    merchantId: "MCH001",
    productName: "Smart Watch",
    description: "Fitness tracking smart watch with heart rate monitor",
    category: "Electronics",
    tags: ["smartwatch", "fitness", "wearable"],
    unit: "piece",
    price: 299.99,
  },
];