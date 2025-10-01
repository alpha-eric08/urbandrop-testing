import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, HelpCircle, ChevronDown, ChevronRight, BookOpen, Users, Settings, ShoppingCart } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I create a new customer account?",
    answer: "To create a new customer account, navigate to the Customers page and click the 'Create Customer' button. Fill in the required information including name, email, phone number, and address details.",
    category: "Customers",
    tags: ["customers", "account", "create"],
  },
  {
    id: "2",
    question: "How can I track order status?",
    answer: "You can track order status by going to the Orders page. Each order displays its current status (Pending, Processing, Shipped, Delivered). Click on an order to see detailed tracking information.",
    category: "Orders",
    tags: ["orders", "tracking", "status"],
  },
  {
    id: "3",
    question: "How do I add a new merchant to the system?",
    answer: "To add a new merchant, go to the Merchants page and click 'Create Merchant'. Fill in the merchant details including business name, contact information, and verification documents.",
    category: "Merchants",
    tags: ["merchants", "business", "create"],
  },
  {
    id: "4",
    question: "What user roles are available in the system?",
    answer: "The system supports three user roles: Super Admin (full access), Admin (manage users and content), and User (limited access to assigned features).",
    category: "Users",
    tags: ["users", "roles", "permissions"],
  },
  {
    id: "5",
    question: "How do I reset my password?",
    answer: "Click 'Forgot Password' on the login page, enter your email address, and follow the instructions in the reset email. You'll be able to create a new password.",
    category: "Account",
    tags: ["password", "reset", "login"],
  },
  {
    id: "6",
    question: "How can I export customer data?",
    answer: "On the Customers page, use the 'Export' button to download customer data in CSV format. You can filter the data before exporting.",
    category: "Data",
    tags: ["export", "data", "csv"],
  },
];

const categories = [
  { name: "Customers", icon: Users, color: "text-blue-500" },
  { name: "Orders", icon: ShoppingCart, color: "text-green-500" },
  { name: "Merchants", icon: BookOpen, color: "text-purple-500" },
  { name: "Users", icon: Users, color: "text-orange-500" },
  { name: "Account", icon: Settings, color: "text-gray-500" },
  { name: "Data", icon: BookOpen, color: "text-indigo-500" },
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === null || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <HelpCircle className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Help Center</h1>
          <p className="text-muted-foreground">
            Find answers to common questions and get help with using the platform
          </p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Browse by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`p-4 rounded-lg border text-center transition-colors ${
                selectedCategory === null 
                  ? "border-primary bg-primary/10 text-primary" 
                  : "border-border hover:bg-muted"
              }`}
            >
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">All</p>
              <p className="text-xs text-muted-foreground">{faqs.length} items</p>
            </button>
            {categories.map(category => {
              const count = faqs.filter(faq => faq.category === category.name).length;
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`p-4 rounded-lg border text-center transition-colors ${
                    selectedCategory === category.name 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${category.color}`} />
                  <p className="text-sm font-medium">{category.name}</p>
                  <p className="text-xs text-muted-foreground">{count} items</p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedCategory ? `${selectedCategory} FAQs` : "Frequently Asked Questions"}
          </CardTitle>
          <p className="text-muted-foreground">
            {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} found
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse different categories
              </p>
            </div>
          ) : (
            filteredFAQs.map(faq => (
              <Collapsible key={faq.id}>
                <CollapsibleTrigger
                  onClick={() => toggleItem(faq.id)}
                  className="flex items-center justify-between w-full p-4 text-left border rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{faq.question}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {faq.category}
                      </Badge>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {faq.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {openItems.includes(faq.id) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-0">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}