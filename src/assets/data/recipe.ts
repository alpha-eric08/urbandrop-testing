export interface Country {
    code: string;
    name: string;
    flag: string;
  }
  
  export interface Ingredient {
    id: string;
    name: string;
    quantity: string;
    unit: string;
  }
  
  export interface PreparationStep {
    id: string;
    stepNumber: number;
    instruction: string;
  }
  
  export interface SocialLinks {
    youtube?: string;
    facebook?: string;
    tiktok?: string;
  }
  
  export interface Recipe {
    id: string;
    food_name: string;
    image_url: string;
    estimated_time: string;
    country: string;
    ingredients: Ingredient[];
    preparation_steps: PreparationStep[];
    instagram_link?: string;
    youTube_link?: string;
    tikTok_link?: string;
    facebook_link?: string;
    created_at: string;
    status: "draft" | "published";
  }
  
  export const COUNTRIES: Country[] = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "IT", name: "Italy", flag: "🇮🇹" },
    { code: "ES", name: "Spain", flag: "🇪🇸" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "CN", name: "China", flag: "🇨🇳" },
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "MX", name: "Mexico", flag: "🇲🇽" },
    { code: "TH", name: "Thailand", flag: "🇹🇭" },
    { code: "GR", name: "Greece", flag: "🇬🇷" },
    { code: "MA", name: "Morocco", flag: "🇲🇦" },
    { code: "PE", name: "Peru", flag: "🇵🇪" },
    { code: "LB", name: "Lebanon", flag: "🇱🇧" },
    { code: "KR", name: "South Korea", flag: "🇰🇷" },
    { code: "VN", name: "Vietnam", flag: "🇻🇳" },
    { code: "BR", name: "Brazil", flag: "🇧🇷" },
    { code: "TR", name: "Turkey", flag: "🇹🇷" },
    { code: "EG", name: "Egypt", flag: "🇪🇬" },
  ];
  