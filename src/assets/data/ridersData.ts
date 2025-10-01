export interface Rider {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: "active" | "inactive" | "pending" | "suspended";
  vehicle: string;
  license: string;
  deliveries: number;
  rating: number;
  earnings: number;
  joinedDate: string;
  lastActive: string;
  zone: string;
}

export const ridersData: Rider[] = [
  {
    id: "1",
    name: "Alexandra Della",
    email: "alexandra.della@email.com",
    phone: "+1234567890",
    avatar: "https://ui-avatars.com/api/?name=Alexandra+Della&background=random",
    status: "active",
    vehicle: "Motorcycle",
    license: "MC123456",
    deliveries: 245,
    rating: 4.8,
    earnings: 2450.50,
    joinedDate: "2023-01-15",
    lastActive: "2024-01-20 14:30",
    zone: "Downtown"
  },
  {
    id: "2", 
    name: "Green Cute",
    email: "green.cute@email.com",
    phone: "+1234567891",
    avatar: "https://ui-avatars.com/api/?name=Green+Cute&background=random",
    status: "active",
    vehicle: "Bicycle",
    license: "BC789012",
    deliveries: 189,
    rating: 4.6,
    earnings: 1890.75,
    joinedDate: "2023-03-20",
    lastActive: "2024-01-20 12:15",
    zone: "Uptown"
  },
  {
    id: "3",
    name: "Marianne Audrey", 
    email: "marianne.audrey@email.com",
    phone: "+1234567892",
    avatar: "https://ui-avatars.com/api/?name=Marianne+Audrey&background=random",
    status: "inactive",
    vehicle: "Car",
    license: "CA345678",
    deliveries: 156,
    rating: 4.2,
    earnings: 1560.25,
    joinedDate: "2023-02-10",
    lastActive: "2024-01-18 09:45",
    zone: "Suburbs"
  },
  {
    id: "4",
    name: "Holland Scott",
    email: "holland.scott@email.com", 
    phone: "+1234567893",
    avatar: "https://ui-avatars.com/api/?name=Holland+Scott&background=random",
    status: "pending",
    vehicle: "Motorcycle",
    license: "MC901234",
    deliveries: 0,
    rating: 0,
    earnings: 0,
    joinedDate: "2024-01-19",
    lastActive: "2024-01-19 16:20",
    zone: "Downtown"
  },
  {
    id: "5",
    name: "Marcus Johnson",
    email: "marcus.johnson@email.com",
    phone: "+1234567894", 
    avatar: "https://ui-avatars.com/api/?name=Marcus+Johnson&background=random",
    status: "suspended",
    vehicle: "Bicycle",
    license: "BC567890",
    deliveries: 98,
    rating: 3.8,
    earnings: 980.00,
    joinedDate: "2023-06-15",
    lastActive: "2024-01-15 11:30",
    zone: "Central"
  }
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-gray-100 text-gray-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "suspended":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};