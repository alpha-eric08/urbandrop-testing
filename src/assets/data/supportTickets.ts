export type SupportPriority = "low" | "medium" | "high" | "urgent";
export type SupportStatus = "open" | "in_progress" | "resolved" | "closed";
export type SupportChannel = "email" | "chat" | "phone" | "web";
export type SupportEntityType = "customer" | "merchant";

export interface SupportMessage {
  id: string;
  sender: "agent" | "user";
  message: string;
  timestamp: string; // ISO string
}

export interface SupportTicket {
  id: string;
  subject: string;
  entityType: SupportEntityType;
  entityId: string; // customers.id or merchants.id
  priority: SupportPriority;
  status: SupportStatus;
  channel: SupportChannel;
  created_at: string; // ISO
  updated_at: string; // ISO
  messages: SupportMessage[];
}

export const supportTickets: SupportTicket[] = [
  {
    id: "TCK-1001",
    subject: "Issue with order delivery time",
    entityType: "customer",
    entityId: "1",
    priority: "medium",
    status: "open",
    channel: "web",
    created_at: "2025-08-07T10:15:00.000Z",
    updated_at: "2025-08-07T10:45:00.000Z",
    messages: [
      {
        id: "MSG-1",
        sender: "user",
        message: "My order arrived 2 hours late yesterday.",
        timestamp: "2025-08-07T10:15:00.000Z",
      },
      {
        id: "MSG-2",
        sender: "agent",
        message: "Sorry about that! We're looking into it.",
        timestamp: "2025-08-07T10:30:00.000Z",
      },
    ],
  },
  {
    id: "TCK-1002",
    subject: "Unable to upload product images",
    entityType: "merchant",
    entityId: "MCH001",
    priority: "high",
    status: "in_progress",
    channel: "email",
    created_at: "2025-08-06T08:20:00.000Z",
    updated_at: "2025-08-06T09:10:00.000Z",
    messages: [
      {
        id: "MSG-3",
        sender: "user",
        message: "Uploads keep failing with an error.",
        timestamp: "2025-08-06T08:20:00.000Z",
      },
    ],
  },
  {
    id: "TCK-1003",
    subject: "Billing invoice not received",
    entityType: "merchant",
    entityId: "MCH002",
    priority: "low",
    status: "resolved",
    channel: "chat",
    created_at: "2025-08-05T12:00:00.000Z",
    updated_at: "2025-08-05T14:30:00.000Z",
    messages: [
      {
        id: "MSG-4",
        sender: "user",
        message: "I didn't get my July invoice.",
        timestamp: "2025-08-05T12:00:00.000Z",
      },
      {
        id: "MSG-5",
        sender: "agent",
        message: "We've sent it again, please check.",
        timestamp: "2025-08-05T14:20:00.000Z",
      },
    ],
  },
];
