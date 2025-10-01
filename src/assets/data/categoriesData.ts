export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSubcategory {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  storageInstructions: string;
  allergyInfo: string;
  nutritionalBenefits: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const categoriesData: ProductCategory[] = [
  {
    id: '1',
    name: 'Flour and Rice',
    description: 'Essential grains and flour products for cooking and baking',
    imageUrl: '/placeholder.svg',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Bread and Buns',
    description: 'Fresh bread, buns and bakery products',
    imageUrl: '/placeholder.svg',
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '3',
    name: 'Cereal and Baby Food',
    description: 'Nutritious cereals and baby food products',
    imageUrl: '/placeholder.svg',
    isActive: true,
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
  },
  {
    id: '4',
    name: 'Canned Food',
    description: 'Preserved and canned food products',
    imageUrl: '/placeholder.svg',
    isActive: true,
    createdAt: '2024-01-15T11:30:00Z',
    updatedAt: '2024-01-15T11:30:00Z',
  },
];

export const subcategoriesData: ProductSubcategory[] = [
  {
    id: '1',
    categoryId: '1',
    name: 'Frozen Corn Dough',
    description: 'Premium frozen corn dough for various cooking applications',
    storageInstructions: 'Keep frozen at -18°C (0°F). Thaw completely in the refrigerator. Do not refreeze once thawed.',
    allergyInfo: 'Allergen contains corn. Naturally gluten-free.',
    nutritionalBenefits: 'A great source of sustained energy. Rich in dietary fibre, aiding digestion. Naturally gluten-free. Contains essential B vitamins and minerals.',
    imageUrl: '/placeholder.svg',
    isActive: true,
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
  },
  {
    id: '2',
    categoryId: '1',
    name: 'Frozen Cassava Dough',
    description: 'Traditional frozen cassava dough for authentic meals',
    storageInstructions: 'Keep frozen at -18°C (0°F) or below. Thaw in the refrigerator before use.',
    allergyInfo: 'Naturally gluten-free. Important Safety Note: Must be cooked thoroughly.',
    nutritionalBenefits: 'Rich in carbohydrates for energy. A good source of Vitamin C and dietary fibre. An excellent gluten-free alternative.',
    imageUrl: '/placeholder.svg',
    isActive: true,
    createdAt: '2024-01-15T12:15:00Z',
    updatedAt: '2024-01-15T12:15:00Z',
  },
  {
    id: '3',
    categoryId: '2',
    name: 'National Spice Bun',
    description: 'Traditional spiced bun with authentic Caribbean flavors',
    storageInstructions: 'Store in a cool, dry place, away from direct sunlight. Reseal the bag tightly after opening to keep it fresh.',
    allergyInfo: 'Contains wheat and soy. May contain traces of nuts.',
    nutritionalBenefits: 'High in carbohydrates for energy. Contains moderate amounts of protein.',
    imageUrl: '/placeholder.svg',
    isActive: true,
    createdAt: '2024-01-15T12:30:00Z',
    updatedAt: '2024-01-15T12:30:00Z',
  },
  {
    id: '4',
    categoryId: '3',
    name: 'Lady B Custard',
    description: 'Smooth and creamy custard powder for desserts',
    storageInstructions: 'Store in a cool, dry place. After opening, keep it in an airtight container. Use within 3 to 4 weeks of opening to ensure optimal freshness.',
    allergyInfo: 'The powder itself does not contain milk. Important: The final prepared product may contain milk depending on preparation.',
    nutritionalBenefits: 'The nutritional value depends on how you prepare it. For a lower-fat option, prepare using skim milk. Use a milk alternative (like almond or soy) for dairy-free options.',
    imageUrl: '/placeholder.svg',
    isActive: true,
    createdAt: '2024-01-15T12:45:00Z',
    updatedAt: '2024-01-15T12:45:00Z',
  },
  {
    id: '5',
    categoryId: '4',
    name: 'Nestle Cerelac - Maize',
    description: 'Nutritious baby cereal made from maize',
    storageInstructions: 'Store in a cool, dry place. After opening, transfer contents to a clean, dry container. Use within 3 to 4 weeks of opening to ensure optimal freshness and safety.',
    allergyInfo: 'Allergens: Contains Milk and may contain traces of gluten. It is gluten-free but not suitable for infants with milk allergies.',
    nutritionalBenefits: 'Fortified with vitamins and minerals to support normal cognitive development. Rich in Calcium and Vitamin D, which are essential for healthy bone development. Contains probiotics (Bifidus BL) to help support the immune system.',
    imageUrl: '/placeholder.svg',
    isActive: true,
    createdAt: '2024-01-15T13:00:00Z',
    updatedAt: '2024-01-15T13:00:00Z',
  },
];