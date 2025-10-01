export interface Promotion {
  id: string;
  title: string;
  description: string;
  merchant: string;
  merchantEmail: string;
  merchantAvatar: string;
  discount: number;
  discountType: "percentage" | "fixed";
  code: string;
  startDate: string;
  endDate: string;
  status: "active" | "inactive" | "pending" | "expired" | "draft";
  usageLimit: number;
  usageCount: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  createdDate: string;
  lastModified: string;
  targetAudience: "all" | "new_customers" | "vip_customers";
}

export const promotionsData: Promotion[] = [
  {
    id: "1",
    title: "Summer Special Discount",
    description: "Get 20% off on all summer items",
    merchant: "Archie Cantones",
    merchantEmail: "arcie.tones@gmail.com",
    merchantAvatar: "https://ui-avatars.com/api/?name=Archie+Cantones&background=random",
    discount: 20,
    discountType: "percentage",
    code: "SUMMER20",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    status: "active",
    usageLimit: 1000,
    usageCount: 245,
    minOrderAmount: 50,
    maxDiscountAmount: 100,
    createdDate: "2023-12-15",
    lastModified: "2024-01-10",
    targetAudience: "all"
  },
  {
    id: "2", 
    title: "New Customer Welcome",
    description: "First order discount for new customers",
    merchant: "Holmes Cherryman",
    merchantEmail: "golms.chan@gmail.com",
    merchantAvatar: "https://ui-avatars.com/api/?name=Holmes+Cherryman&background=random",
    discount: 15,
    discountType: "percentage",
    code: "WELCOME15",
    startDate: "2024-01-01",
    endDate: "2024-12-31", 
    status: "active",
    usageLimit: 500,
    usageCount: 89,
    minOrderAmount: 25,
    maxDiscountAmount: 50,
    createdDate: "2024-01-01",
    lastModified: "2024-01-15",
    targetAudience: "new_customers"
  },
  {
    id: "3",
    title: "VIP Member Exclusive",
    description: "Special discount for VIP members only", 
    merchant: "Malanie Hanvey",
    merchantEmail: "lanie.nveyn@gmail.com",
    merchantAvatar: "https://ui-avatars.com/api/?name=Malanie+Hanvey&background=random",
    discount: 25,
    discountType: "percentage",
    code: "VIP25",
    startDate: "2024-02-01",
    endDate: "2024-04-30",
    status: "pending",
    usageLimit: 200,
    usageCount: 0,
    minOrderAmount: 100,
    maxDiscountAmount: 150,
    createdDate: "2024-01-20",
    lastModified: "2024-01-20",
    targetAudience: "vip_customers"
  },
  {
    id: "4",
    title: "Flash Sale Friday",
    description: "Limited time flash sale discount",
    merchant: "Kenneth Hune",
    merchantEmail: "nneth.une@gmail.com", 
    merchantAvatar: "https://ui-avatars.com/api/?name=Kenneth+Hune&background=random",
    discount: 30,
    discountType: "fixed",
    code: "FLASH30",
    startDate: "2024-01-12",
    endDate: "2024-01-12",
    status: "expired",
    usageLimit: 100,
    usageCount: 100,
    minOrderAmount: 75,
    createdDate: "2024-01-10",
    lastModified: "2024-01-12",
    targetAudience: "all"
  },
  {
    id: "5",
    title: "Valentine's Day Special",
    description: "Romantic dinner discount for couples",
    merchant: "Valentine Maton",
    merchantEmail: "alenine.aton@gmail.com",
    merchantAvatar: "https://ui-avatars.com/api/?name=Valentine+Maton&background=random",
    discount: 40,
    discountType: "fixed",
    code: "LOVE40",
    startDate: "2024-02-10", 
    endDate: "2024-02-20",
    status: "draft",
    usageLimit: 300,
    usageCount: 0,
    minOrderAmount: 120,
    createdDate: "2024-01-18",
    lastModified: "2024-01-19",
    targetAudience: "all"
  }
];

export const getPromotionStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-gray-100 text-gray-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "expired":
      return "bg-red-100 text-red-800";
    case "draft":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};