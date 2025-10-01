export interface Banner {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  position: number;
  linkUrl?: string;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export const bannersData: Banner[] = [
  {
    id: '1',
    title: 'Summer Sale 2024',
    description: 'Get up to 50% off on all summer items',
    imageUrl: '/placeholder.svg',
    isActive: true,
    position: 1,
    linkUrl: '/promotions/summer-sale',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    createdAt: '2024-05-15T10:00:00Z',
    updatedAt: '2024-05-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'New Product Launch',
    description: 'Discover our latest organic products',
    imageUrl: '/placeholder.svg',
    isActive: true,
    position: 2,
    linkUrl: '/products/new-arrivals',
    startDate: '2024-07-01',
    createdAt: '2024-06-20T14:30:00Z',
    updatedAt: '2024-06-20T14:30:00Z',
  },
  {
    id: '3',
    title: 'Free Delivery',
    description: 'Free delivery on orders over $50',
    imageUrl: '/placeholder.svg',
    isActive: false,
    position: 3,
    linkUrl: '/delivery-info',
    startDate: '2024-05-01',
    endDate: '2024-05-31',
    createdAt: '2024-04-25T09:15:00Z',
    updatedAt: '2024-05-01T16:45:00Z',
  },
];