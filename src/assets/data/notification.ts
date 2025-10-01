 interface NotificationItem {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  message: string;
  type: "info" | "warning" | "success" | "error";
  timestamp: Date;
  read: boolean;
}

export const notifications: NotificationItem[] = [
  {
    id: "1",
    user: {
      name: "Malanie Hanvey",
      avatar: "https://youngandvibe.com/dashboard/assets/images/avatar/2.png",
    },
    message: "We should talk about that at lunch!",
    type: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    read: false,
  },
  {
    id: "2",
    user: {
      name: "Valentine Maton",
      avatar: "https://youngandvibe.com/dashboard/assets/images/avatar/3.png",
    },
    message: "You can download the latest invoices now.",
    type: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 36),
    read: false,
  },
  {
    id: "3",
    user: {
      name: "Archie Cantones",
      avatar: "https://youngandvibe.com/dashboard/assets/images/avatar/4.png",
    },
    message: "Don't forget to pickup Jeremy after school!",
    type: "warning",
    timestamp: new Date(Date.now() - 1000 * 60 * 53),
    read: false,
  },
  {
    id: "4",
    user: {
      name: "System",
      avatar: "https://youngandvibe.com/dashboard/assets/images/avatar/1.png",
    },
    message: "Temporary server issues detected. Please try again later",
    type: "error",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    read: true,
  },
];


// utils/timeAgo.ts
export const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  return date.toLocaleDateString();
};
