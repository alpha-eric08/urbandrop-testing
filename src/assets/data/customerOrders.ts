interface CustomerOrder {
  id: string;
  orderNumber: string;
  date: string;
  items: string;
  amount: number;
  status: "Delivered" | "Pending" | "Cancelled" | "Processing";
  paymentMethod: string;
}

export const customerOrders: { [customerId: string]: CustomerOrder[] } = {
  "CU567890": [
    {
      id: "ORD001",
      orderNumber: "ORD-2024-001",
      date: "2024-01-15",
      items: "Wireless Headphones, Phone Case",
      amount: 89.99,
      status: "Delivered",
      paymentMethod: "Credit Card"
    },
    {
      id: "ORD002",
      orderNumber: "ORD-2024-002",
      date: "2024-01-20",
      items: "Laptop Stand",
      amount: 45.50,
      status: "Processing",
      paymentMethod: "PayPal"
    }
  ],
  "CU678901": [
    {
      id: "ORD003",
      orderNumber: "ORD-2024-003",
      date: "2024-01-18",
      items: "Bluetooth Speaker",
      amount: 75.00,
      status: "Delivered",
      paymentMethod: "Credit Card"
    }
  ],
  "CU789012": [
    {
      id: "ORD004",
      orderNumber: "ORD-2024-004",
      date: "2024-01-22",
      items: "Smart Watch, Charging Cable",
      amount: 199.99,
      status: "Pending",
      paymentMethod: "Debit Card"
    }
  ],
  "CU890123": [],
  "CU901234": [
    {
      id: "ORD005",
      orderNumber: "ORD-2024-005",
      date: "2024-01-25",
      items: "Gaming Mouse",
      amount: 65.00,
      status: "Cancelled",
      paymentMethod: "Credit Card"
    }
  ],
  "CU012345": [
    {
      id: "ORD006",
      orderNumber: "ORD-2024-006",
      date: "2024-01-28",
      items: "Keyboard, Mouse Pad",
      amount: 120.00,
      status: "Delivered",
      paymentMethod: "PayPal"
    }
  ]
};