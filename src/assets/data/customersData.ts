import { profile } from "../images";

interface Customer { 
  id: string;
  name: string;
  customerId: string;
  email: string;
  avatar: any;
  phone: string;
  location: string;
  country: string;
  website: string;
  dateOfBirth: string;
  joinDate: string;
  subscriptionStatus: "Premium" | "Basic";
  accountStatus: "Active" | "Inactive" | "Pending" | "Suspended";
  orderCount: number;
  orderValue: string;
}

export const customers: Customer[] = [
  {
    id: "1",
    customerId: "CUST-0001",
    name: "Alexandra Della",
    email: "alex.della@outlook.com",
    avatar: profile,
    phone: "+01 (375) 2589 645",
    location: "California, USA",
    country: "United States",
    website: "https://urbandrop.io",
    subscriptionStatus: "Premium",
    accountStatus: "Active",
    dateOfBirth: "26 May, 2000",
    orderCount: 15,
    orderValue: "$2,450",
    joinDate: "March 2023"
  },
  {
    id: "CU567890",
    customerId: "CUST-2347",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: profile,
    phone: "+1 234 567 8900",
    location: "New York, USA",
    country: "United States",
    website: "https://example.com",
    subscriptionStatus: "Premium",
    accountStatus: "Active",
    dateOfBirth: "15 Jan, 1995",
    orderCount: 10,
    orderValue: "$1,250",
    joinDate: "June 2022"
  },
  {
    id: "CU678901",
    customerId: "CUST-1236",
    name: "Michael Davis",
    email: "michael.davis@email.com",
    avatar: profile,
    phone: "+1 234 567 8901",
    location: "Chicago, USA",
    country: "United States",
    website: "https://example.com",
    subscriptionStatus: "Basic",
    accountStatus: "Active",
    dateOfBirth: "03 Sep, 1990",
    orderCount: 7,
    orderValue: "$890",
    joinDate: "May 2021"
  },
  {
    id: "CU789012",
    customerId: "CUST-2345",
    name: "Emily Wilson",
    email: "emily.wilson@email.com",
    avatar: profile,
    phone: "+1 234 567 8902",
    location: "Austin, USA",
    country: "United States",
    website: "https://example.com",
    subscriptionStatus: "Premium",
    accountStatus: "Pending",
    dateOfBirth: "19 Nov, 1998",
    orderCount: 5,
    orderValue: "$620",
    joinDate: "December 2023"
  },
  {
    id: "CU890123",
    customerId: "CUST-1234",
    name: "David Brown",
    email: "david.brown@email.com",
    avatar: profile,
    phone: "+1 234 567 8903",
    location: "Seattle, USA",
    country: "United States",
    website: "https://example.com",
    subscriptionStatus: "Basic",
    accountStatus: "Inactive",
    dateOfBirth: "07 Jul, 1988",
    orderCount: 3,
    orderValue: "$430",
    joinDate: "January 2020"
  },
  {
    id: "CU901234",
    customerId: "CUST-2346",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    avatar: profile,
    phone: "+1 234 567 8904",
    location: "Denver, USA",
    country: "United States",
    website: "https://example.com",
    subscriptionStatus: "Premium",
    accountStatus: "Active",
    dateOfBirth: "21 Apr, 1993",
    orderCount: 12,
    orderValue: "$1,780",
    joinDate: "August 2021"
  },
  {
    id: "CU012345",
    customerId: "CUST-1235",
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    avatar: profile,
    phone: "+1 234 567 8905",
    location: "Boston, USA",
    country: "United States",
    website: "https://example.com",
    subscriptionStatus: "Basic",
    accountStatus: "Suspended",
    dateOfBirth: "10 Oct, 1985",
    orderCount: 0,
    orderValue: "$0",
    joinDate: "February 2019"
  }
];
