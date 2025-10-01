import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, ExternalLink, Download, FileText, Video, Code, Users, Settings, ShoppingCart } from "lucide-react";

interface DocItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "guide" | "api" | "video" | "download";
  url: string;
  tags: string[];
  lastUpdated: Date;
}

const docs: DocItem[] = [
  {
    id: "1",
    title: "Getting Started Guide",
    description: "Complete guide to setting up and using the Urban Drop admin platform",
    category: "Getting Started",
    type: "guide",
    url: "/docs/getting-started",
    tags: ["setup", "basics", "tutorial"],
    lastUpdated: new Date(2024, 6, 15),
  },
  {
    id: "2",
    title: "User Management",
    description: "Learn how to create, edit, and manage user accounts and permissions",
    category: "User Management",
    type: "guide",
    url: "/docs/user-management",
    tags: ["users", "permissions", "roles"],
    lastUpdated: new Date(2024, 6, 10),
  },
  {
    id: "3",
    title: "API Documentation",
    description: "Complete REST API reference for developers",
    category: "Developer",
    type: "api",
    url: "/docs/api",
    tags: ["api", "developers", "integration"],
    lastUpdated: new Date(2024, 6, 20),
  },
  {
    id: "4",
    title: "Order Processing Workflow",
    description: "Understanding the complete order lifecycle and management",
    category: "Orders",
    type: "guide",
    url: "/docs/orders",
    tags: ["orders", "workflow", "processing"],
    lastUpdated: new Date(2024, 6, 12),
  },
  {
    id: "5",
    title: "Platform Overview Video",
    description: "Video walkthrough of the main platform features",
    category: "Getting Started",
    type: "video",
    url: "/docs/video/overview",
    tags: ["video", "overview", "features"],
    lastUpdated: new Date(2024, 6, 8),
  },
  {
    id: "6",
    title: "Merchant Onboarding",
    description: "Step-by-step process for adding and verifying new merchants",
    category: "Merchants",
    type: "guide",
    url: "/docs/merchants",
    tags: ["merchants", "onboarding", "verification"],
    lastUpdated: new Date(2024, 6, 5),
  },
  {
    id: "7",
    title: "Data Export Templates",
    description: "Download CSV templates for data import and export",
    category: "Data Management",
    type: "download",
    url: "/downloads/templates",
    tags: ["csv", "export", "templates"],
    lastUpdated: new Date(2024, 6, 1),
  },
  {
    id: "8",
    title: "Security & Compliance",
    description: "Security best practices and compliance guidelines",
    category: "Security",
    type: "guide",
    url: "/docs/security",
    tags: ["security", "compliance", "best-practices"],
    lastUpdated: new Date(2024, 5, 28),
  },
];

const categories = [
  { name: "Getting Started", icon: BookOpen, color: "text-blue-500" },
  { name: "User Management", icon: Users, color: "text-green-500" },
  { name: "Orders", icon: ShoppingCart, color: "text-purple-500" },
  { name: "Merchants", icon: Settings, color: "text-orange-500" },
  { name: "Developer", icon: Code, color: "text-gray-500" },
  { name: "Data Management", icon: FileText, color: "text-indigo-500" },
  { name: "Security", icon: Settings, color: "text-red-500" },
];

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "guide":
        return <FileText className="h-4 w-4" />;
      case "api":
        return <Code className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "download":
        return <Download className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "guide":
        return "bg-blue-100 text-blue-800";
      case "api":
        return "bg-green-100 text-green-800";
      case "video":
        return "bg-purple-100 text-purple-800";
      case "download":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = searchQuery === "" || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === null || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Documentation</h1>
          <p className="text-muted-foreground">
            Comprehensive guides, API references, and tutorials
          </p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search documentation..."
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
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
              <p className="text-xs text-muted-foreground">{docs.length}</p>
            </button>
            {categories.map(category => {
              const count = docs.filter(doc => doc.category === category.name).length;
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
                  <p className="text-xs text-muted-foreground">{count}</p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Documentation Items */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No documentation found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or browse different categories
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredDocs.map(doc => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(doc.type)}
                    <Badge className={getTypeBadgeColor(doc.type)}>
                      {doc.type}
                    </Badge>
                  </div>
                  <Badge variant="outline">{doc.category}</Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{doc.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  {doc.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {doc.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-muted-foreground">
                    Updated {doc.lastUpdated.toLocaleDateString()}
                  </p>
                  <Button size="sm" variant="outline">
                    {doc.type === "download" ? (
                      <>
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </>
                    ) : (
                      <>
                        View
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}