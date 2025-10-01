export interface Merchant {
    id: string;
    merchantName: string;
    email: string;
    phoneNumber: string;
    merchantAddress: string;
    postCode: string;
    businessType: BusinessType;
    status: MerchantStatus;
    createdAt: string;
    updatedAt: string;
    // Additional details for merchant view
    businessRegistrationNumber?: string;
    taxId?: string;
    businessDescription?: string;
    operatingHours?: OperatingHours;
    socialMedia?: SocialMedia;
    bankDetails?: BankDetails;
    documents?: Document[];
    rating?: number;
    totalOrders?: number;
    totalRevenue?: number;
    joinDate?: string;
  }


  // Add this to the bottom of your merchant.ts file

export const SAMPLE_MERCHANTS: Merchant[] = [
  {
    id: "MERCH001",
    merchantName: "Bella's Italian Kitchen",
    email: "contact@bellasitalian.com",
    phoneNumber: "+1 (555) 123-4567",
    merchantAddress: "123 Main Street, Downtown District",
    postCode: "10001",
    businessType: "Restaurant",
    status: "Active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    businessRegistrationNumber: "REG123456789",
    taxId: "TAX987654321",
    businessDescription: "Authentic Italian cuisine with traditional recipes passed down through generations. We specialize in fresh pasta, wood-fired pizzas, and classic Italian dishes.",
    operatingHours: {
      monday: { isOpen: true, openTime: "11:00 AM", closeTime: "10:00 PM" },
      tuesday: { isOpen: true, openTime: "11:00 AM", closeTime: "10:00 PM" },
      wednesday: { isOpen: true, openTime: "11:00 AM", closeTime: "10:00 PM" },
      thursday: { isOpen: true, openTime: "11:00 AM", closeTime: "10:00 PM" },
      friday: { isOpen: true, openTime: "11:00 AM", closeTime: "11:00 PM" },
      saturday: { isOpen: true, openTime: "10:00 AM", closeTime: "11:00 PM" },
      sunday: { isOpen: true, openTime: "10:00 AM", closeTime: "9:00 PM" },
    },
    socialMedia: {
      website: "https://bellasitalian.com",
      facebook: "https://facebook.com/bellasitalian",
      instagram: "https://instagram.com/bellasitalian",
    },
    bankDetails: {
      bankName: "Chase Bank",
      accountNumber: "1234567890",
      accountHolderName: "Bella's Italian Kitchen LLC",
      routingNumber: "021000021",
    },
    documents: [
      {
        id: "1",
        name: "Business License",
        type: "business_license",
        url: "/documents/business-license.pdf",
        uploadedAt: "2024-01-15",
      },
      {
        id: "2",
        name: "Tax Certificate",
        type: "tax_certificate",
        url: "/documents/tax-cert.pdf",
        uploadedAt: "2024-01-15",
      },
    ],
    rating: 4.8,
    totalOrders: 1247,
    totalRevenue: 65420.5,
    joinDate: "Jan 15, 2024",
  },
  {
    id: "MERCH001",
    merchantName: "Bella's Italian Kitchen",
    email: "contact@bellasitalian.com",
    phoneNumber: "+1 (555) 123-4567",
    merchantAddress: "123 Main Street, Downtown District",
    postCode: "10001",
    businessType: "Restaurant",
    status: "Active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    businessRegistrationNumber: "REG123456789",
    taxId: "TAX987654321",
    businessDescription: "Authentic Italian cuisine with traditional recipes passed down through generations. We specialize in fresh pasta, wood-fired pizzas, and classic Italian dishes.",
    operatingHours: {
      monday: { isOpen: true, openTime: "11:00 AM", closeTime: "10:00 PM" },
      tuesday: { isOpen: true, openTime: "11:00 AM", closeTime: "10:00 PM" },
      wednesday: { isOpen: true, openTime: "11:00 AM", closeTime: "10:00 PM" },
      thursday: { isOpen: true, openTime: "11:00 AM", closeTime: "10:00 PM" },
      friday: { isOpen: true, openTime: "11:00 AM", closeTime: "11:00 PM" },
      saturday: { isOpen: true, openTime: "10:00 AM", closeTime: "11:00 PM" },
      sunday: { isOpen: true, openTime: "10:00 AM", closeTime: "9:00 PM" },
    },
    socialMedia: {
      website: "https://bellasitalian.com",
      facebook: "https://facebook.com/bellasitalian",
      instagram: "https://instagram.com/bellasitalian",
    },
    bankDetails: {
      bankName: "Chase Bank",
      accountNumber: "1234567890",
      accountHolderName: "Bella's Italian Kitchen LLC",
      routingNumber: "021000021",
    },
    documents: [
      {
        id: "1",
        name: "Business License",
        type: "business_license",
        url: "/documents/business-license.pdf",
        uploadedAt: "2024-01-15",
      },
      {
        id: "2",
        name: "Tax Certificate",
        type: "tax_certificate",
        url: "/documents/tax-cert.pdf",
        uploadedAt: "2024-01-15",
      },
    ],
    rating: 4.8,
    totalOrders: 1247,
    totalRevenue: 65420.50,
    joinDate: "Jan 15, 2024",
  },
  {
    id: "MERCH002",
    merchantName: "Tech Solutions Store",
    email: "info@techsolutions.com",
    phoneNumber: "+1 (555) 234-5678",
    merchantAddress: "456 Technology Blvd, Innovation Park",
    postCode: "10002",
    businessType: "Electronics",
    status: "Pending",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-22",
    businessRegistrationNumber: "REG987654321",
    taxId: "TAX123456789",
    businessDescription: "Leading provider of cutting-edge technology solutions including computers, smartphones, and electronic accessories.",
    operatingHours: {
      monday: { isOpen: true, openTime: "9:00 AM", closeTime: "8:00 PM" },
      tuesday: { isOpen: true, openTime: "9:00 AM", closeTime: "8:00 PM" },
      wednesday: { isOpen: true, openTime: "9:00 AM", closeTime: "8:00 PM" },
      thursday: { isOpen: true, openTime: "9:00 AM", closeTime: "8:00 PM" },
      friday: { isOpen: true, openTime: "9:00 AM", closeTime: "8:00 PM" },
      saturday: { isOpen: true, openTime: "10:00 AM", closeTime: "6:00 PM" },
      sunday: { isOpen: false },
    },
    socialMedia: {
      website: "https://techsolutions.com",
      twitter: "https://twitter.com/techsolutions",
    },
    bankDetails: {
      bankName: "Bank of America",
      accountNumber: "9876543210",
      accountHolderName: "Tech Solutions Inc",
      routingNumber: "011000015",
    },
    documents: [
      {
        id: "3",
        name: "Electronics Dealer License",
        type: "business_license",
        url: "/documents/electronics-license.pdf",
        uploadedAt: "2024-01-20",
      },
    ],
    rating: 4.5,
    totalOrders: 856,
    totalRevenue: 125780.25,
    joinDate: "Jan 20, 2024",
  },
  {
    id: "MERCH003",
    merchantName: "Green Valley Pharmacy",
    email: "contact@greenvalleypharmacy.com",
    phoneNumber: "+1 (555) 345-6789",
    merchantAddress: "789 Health Avenue, Medical District",
    postCode: "10003",
    businessType: "Pharmacy",
    status: "Active",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-25",
    businessRegistrationNumber: "REG456789123",
    taxId: "TAX789123456",
    businessDescription: "Full-service pharmacy providing prescription medications, over-the-counter drugs, and health consultation services.",
    operatingHours: {
      monday: { isOpen: true, openTime: "8:00 AM", closeTime: "9:00 PM" },
      tuesday: { isOpen: true, openTime: "8:00 AM", closeTime: "9:00 PM" },
      wednesday: { isOpen: true, openTime: "8:00 AM", closeTime: "9:00 PM" },
      thursday: { isOpen: true, openTime: "8:00 AM", closeTime: "9:00 PM" },
      friday: { isOpen: true, openTime: "8:00 AM", closeTime: "9:00 PM" },
      saturday: { isOpen: true, openTime: "9:00 AM", closeTime: "7:00 PM" },
      sunday: { isOpen: true, openTime: "10:00 AM", closeTime: "6:00 PM" },
    },
    socialMedia: {
      website: "https://greenvalleypharmacy.com",
      facebook: "https://facebook.com/greenvalleypharmacy",
    },
    bankDetails: {
      bankName: "Wells Fargo",
      accountNumber: "5555666677",
      accountHolderName: "Green Valley Pharmacy Corp",
      routingNumber: "121000248",
    },
    documents: [
      {
        id: "4",
        name: "Pharmacy License",
        type: "business_license",
        url: "/documents/pharmacy-license.pdf",
        uploadedAt: "2024-01-10",
      },
      {
        id: "5",
        name: "DEA Registration",
        type: "other",
        url: "/documents/dea-registration.pdf",
        uploadedAt: "2024-01-10",
      },
    ],
    rating: 4.9,
    totalOrders: 2341,
    totalRevenue: 89650.75,
    joinDate: "Jan 10, 2024",
  },
  {
    id: "MERCH004",
    merchantName: "Fresh Market Grocers",
    email: "hello@freshmarket.com",
    phoneNumber: "+1 (555) 456-7890",
    merchantAddress: "321 Organic Street, Green District",
    postCode: "10004",
    businessType: "Grocery Store",
    status: "Suspended",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-28",
    businessRegistrationNumber: "REG321654987",
    taxId: "TAX654987321",
    businessDescription: "Organic and locally-sourced grocery store specializing in fresh produce, sustainable products, and healthy food options.",
    operatingHours: {
      monday: { isOpen: true, openTime: "7:00 AM", closeTime: "10:00 PM" },
      tuesday: { isOpen: true, openTime: "7:00 AM", closeTime: "10:00 PM" },
      wednesday: { isOpen: true, openTime: "7:00 AM", closeTime: "10:00 PM" },
      thursday: { isOpen: true, openTime: "7:00 AM", closeTime: "10:00 PM" },
      friday: { isOpen: true, openTime: "7:00 AM", closeTime: "10:00 PM" },
      saturday: { isOpen: true, openTime: "7:00 AM", closeTime: "10:00 PM" },
      sunday: { isOpen: true, openTime: "8:00 AM", closeTime: "9:00 PM" },
    },
    socialMedia: {
      website: "https://freshmarket.com",
      instagram: "https://instagram.com/freshmarket",
    },
    bankDetails: {
      bankName: "CitiBank",
      accountNumber: "1111222233",
      accountHolderName: "Fresh Market Grocers LLC",
      routingNumber: "021000089",
    },
    documents: [
      {
        id: "6",
        name: "Food Handler's License",
        type: "business_license",
        url: "/documents/food-license.pdf",
        uploadedAt: "2024-01-05",
      },
    ],
    rating: 4.2,
    totalOrders: 1789,
    totalRevenue: 134250.00,
    joinDate: "Jan 5, 2024",
  },
  {
    id: "MERCH005",
    merchantName: "Urban Fashion Boutique",
    email: "style@urbanfashion.com",
    phoneNumber: "+1 (555) 567-8901",
    merchantAddress: "654 Fashion Way, Style Quarter",
    postCode: "10005",
    businessType: "Clothing",
    status: "Active",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-26",
    businessRegistrationNumber: "REG789123654",
    taxId: "TAX147258369",
    businessDescription: "Contemporary fashion boutique offering trendy clothing, accessories, and style consultation for the modern urban lifestyle.",
    operatingHours: {
      monday: { isOpen: true, openTime: "10:00 AM", closeTime: "8:00 PM" },
      tuesday: { isOpen: true, openTime: "10:00 AM", closeTime: "8:00 PM" },
      wednesday: { isOpen: true, openTime: "10:00 AM", closeTime: "8:00 PM" },
      thursday: { isOpen: true, openTime: "10:00 AM", closeTime: "8:00 PM" },
      friday: { isOpen: true, openTime: "10:00 AM", closeTime: "9:00 PM" },
      saturday: { isOpen: true, openTime: "10:00 AM", closeTime: "9:00 PM" },
      sunday: { isOpen: true, openTime: "12:00 PM", closeTime: "6:00 PM" },
    },
    socialMedia: {
      website: "https://urbanfashion.com",
      facebook: "https://facebook.com/urbanfashion",
      instagram: "https://instagram.com/urbanfashion",
      twitter: "https://twitter.com/urbanfashion",
    },
    bankDetails: {
      bankName: "TD Bank",
      accountNumber: "9988776655",
      accountHolderName: "Urban Fashion Boutique Inc",
      routingNumber: "031101266",
    },
    documents: [
      {
        id: "7",
        name: "Retail License",
        type: "business_license",
        url: "/documents/retail-license.pdf",
        uploadedAt: "2024-01-12",
      },
      {
        id: "8",
        name: "Sales Tax Permit",
        type: "tax_certificate",
        url: "/documents/sales-tax.pdf",
        uploadedAt: "2024-01-12",
      },
    ],
    rating: 4.6,
    totalOrders: 967,
    totalRevenue: 78920.40,
    joinDate: "Jan 12, 2024",
  },
];



 
  
  export interface OperatingHours {
    monday: TimeSlot;
    tuesday: TimeSlot;
    wednesday: TimeSlot;
    thursday: TimeSlot;
    friday: TimeSlot;
    saturday: TimeSlot;
    sunday: TimeSlot;
  }
  
  export interface TimeSlot {
    isOpen: boolean;
    openTime?: string;
    closeTime?: string;
  }
  
  export interface SocialMedia {
    website?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  }
  
  export interface BankDetails {
    bankName: string;
    accountNumber: string;
    accountHolderName: string;
    routingNumber?: string;
  }
  
  export interface Document {
    id: string;
    name: string;
    type: "business_license" | "tax_certificate" | "identity_proof" | "other";
    url: string;
    uploadedAt: string;
  }
  
  export type BusinessType = 
    | "Restaurant"
    | "Grocery Store"
    | "Pharmacy"
    | "Electronics"
    | "Clothing"
    | "Home & Garden"
    | "Sports & Outdoors"
    | "Books & Media"
    | "Health & Beauty"
    | "Toys & Games"
    | "Automotive"
    | "Pet Supplies"
    | "Other";
  
  export type MerchantStatus = 
    | "Active"
    | "Pending"
    | "Suspended"
    | "Inactive"
    | "Rejected";
  
  export const BUSINESS_TYPES: BusinessType[] = [
    "Restaurant",
    "Grocery Store",
    "Pharmacy",
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports & Outdoors",
    "Books & Media",
    "Health & Beauty",
    "Toys & Games",
    "Automotive",
    "Pet Supplies",
    "Other",
  ];
  
  export const MERCHANT_STATUSES: MerchantStatus[] = [
    "Active",
    "Pending",
    "Suspended",
    "Inactive",
    "Rejected",
  ];
  