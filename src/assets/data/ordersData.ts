export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerId: string;
  merchantName: string;
  merchantId: string;
  items: OrderItem[];
  orderSubtotal: number;
  discount: number;
  deliveryFee: number;
  totalAmount: number;
  status: "Pending" | "Confirmed" | "Preparing" | "Ready" | "Out for Delivery" | "Delivered" | "Cancelled";
  paymentMethod: string;
  paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded";
  orderDate: string;
  deliveryDate?: string;
  deliveryAddress: string;
  notes?: string;
  estimatedDeliveryTime?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export const ordersData: Order[] = [
  {
    id: "ORD001",
    orderNumber: "ORD-2024-001",
    customerName: "John Doe",
    customerId: "CU567890",
    merchantName: "Pizza Palace",
    merchantId: "M001",
    items: [
      { id: "1", name: "Margherita Pizza", quantity: 2, price: 18.99 },
      { id: "2", name: "Coca Cola", quantity: 2, price: 2.50 }
    ],
    orderSubtotal: 39.98,
    discount: 2.00,
    deliveryFee: 5.00,
    totalAmount: 42.98,
    status: "Delivered",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    orderDate: "2024-01-15T10:30:00Z",
    deliveryDate: "2024-01-15T11:45:00Z",
    deliveryAddress: "123 Main St, Downtown",
    estimatedDeliveryTime: "45 mins"
  },
  {
    id: "ORD002",
    orderNumber: "ORD-2024-002",
    customerName: "Jane Smith",
    customerId: "CU678901",
    merchantName: "Burger Spot",
    merchantId: "M002",
    items: [
      { id: "3", name: "Chicken Burger", quantity: 1, price: 12.99 },
      { id: "4", name: "French Fries", quantity: 1, price: 4.99 }
    ],
    orderSubtotal: 17.98,
    discount: 0.00,
    deliveryFee: 3.50,
    totalAmount: 21.48,
    status: "Out for Delivery",
    paymentMethod: "PayPal",
    paymentStatus: "Paid",
    orderDate: "2024-01-15T14:20:00Z",
    deliveryAddress: "456 Oak Ave, Uptown",
    estimatedDeliveryTime: "30 mins"
  },
  {
    id: "ORD003",
    orderNumber: "ORD-2024-003",
    customerName: "Mike Johnson",
    customerId: "CU789012",
    merchantName: "Sushi World",
    merchantId: "M003",
    items: [
      { id: "5", name: "California Roll", quantity: 2, price: 8.99 },
      { id: "6", name: "Salmon Sashimi", quantity: 1, price: 15.99 }
    ],
    orderSubtotal: 33.97,
    discount: 5.00,
    deliveryFee: 4.00,
    totalAmount: 32.97,
    status: "Preparing",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    orderDate: "2024-01-15T13:15:00Z",
    deliveryAddress: "789 Pine St, Midtown",
    estimatedDeliveryTime: "55 mins"
  },
  {
    id: "ORD004",
    orderNumber: "ORD-2024-004",
    customerName: "Sarah Wilson",
    customerId: "CU890123",
    merchantName: "Coffee Corner",
    merchantId: "M004",
    items: [
      { id: "7", name: "Cappuccino", quantity: 2, price: 4.50 },
      { id: "8", name: "Croissant", quantity: 3, price: 3.25 }
    ],
    orderSubtotal: 18.75,
    discount: 1.50,
    deliveryFee: 2.50,
    totalAmount: 19.75,
    status: "Pending",
    paymentMethod: "Cash",
    paymentStatus: "Pending",
    orderDate: "2024-01-15T15:45:00Z",
    deliveryAddress: "321 Elm St, Southside",
    estimatedDeliveryTime: "25 mins"
  },
  {
    id: "ORD005",
    orderNumber: "ORD-2024-005",
    customerName: "David Brown",
    customerId: "CU901234",
    merchantName: "Taco Fiesta",
    merchantId: "M005",
    items: [
      { id: "9", name: "Beef Tacos", quantity: 3, price: 2.99 },
      { id: "10", name: "Guacamole", quantity: 1, price: 3.50 }
    ],
    orderSubtotal: 12.47,
    discount: 0.00,
    deliveryFee: 3.00,
    totalAmount: 15.47,
    status: "Cancelled",
    paymentMethod: "Credit Card",
    paymentStatus: "Refunded",
    orderDate: "2024-01-15T12:30:00Z",
    deliveryAddress: "654 Maple Dr, Westend",
    notes: "Customer requested cancellation"
  }
];

export const getOrderStatusColor = (status: Order['status']) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Confirmed":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Preparing":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Ready":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Out for Delivery":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "Delivered":
      return "bg-green-100 text-green-800 border-green-200";
    case "Cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getPaymentStatusColor = (status: Order['paymentStatus']) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Paid":
      return "bg-green-100 text-green-800 border-green-200";
    case "Failed":
      return "bg-red-100 text-red-800 border-red-200";
    case "Refunded":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};