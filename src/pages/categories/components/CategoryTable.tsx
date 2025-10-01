import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  Edit, 
  Trash2, 
  Search, 
  ChevronDown,
  ChevronRight,
  FolderIcon,
  FolderTreeIcon,
  Plus,
  Image as ImageIcon
} from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { useToast } from "@/hooks/use-toast";

interface CategoryTableProps {
  onAddSubcategory: (categoryId: string) => void;
}

const CategoryTable = ({ onAddSubcategory }: CategoryTableProps) => {
  const { 
    categories, 
    subcategories, 
    updateCategory, 
    updateSubcategory,
    deleteCategory, 
    deleteSubcategory,
    getSubcategoriesByCategory,
    isLoading 
  } = useCategories();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleToggleCategoryStatus = async (categoryId: string, isActive: boolean) => {
    const result = await updateCategory(categoryId, { isActive });
    if (result.success) {
      toast({
        title: "Success",
        description: "Category status updated successfully",
      });
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const handleToggleSubcategoryStatus = async (subcategoryId: string, isActive: boolean) => {
    const result = await updateSubcategory(subcategoryId, { isActive });
    if (result.success) {
      toast({
        title: "Success",
        description: "Subcategory status updated successfully",
      });
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm("Are you sure you want to delete this category? This will also delete all subcategories.")) {
      const result = await deleteCategory(categoryId);
      if (result.success) {
        toast({
          title: "Success",
          description: "Category deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteSubcategory = async (subcategoryId: string) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      const result = await deleteSubcategory(subcategoryId);
      if (result.success) {
        toast({
          title: "Success",
          description: "Subcategory deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <FolderTreeIcon className="h-5 w-5" />
              Category Management
            </CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => {
                  const categorySubcategories = getSubcategoriesByCategory(category.id);
                  const isExpanded = expandedCategories.has(category.id);
                  
                  return (
                    <Collapsible
                      key={category.id}
                      open={isExpanded}
                      onOpenChange={() => toggleCategory(category.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <TableRow className="cursor-pointer hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center">
                              {categorySubcategories.length > 0 ? (
                                isExpanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )
                              ) : (
                                <div className="w-4" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <FolderIcon className="h-4 w-4 text-blue-600" />
                              <span className="font-medium">{category.name}</span>
                              {categorySubcategories.length > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  {categorySubcategories.length}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                          <TableCell>
                            <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                              <img 
                                src={category.imageUrl} 
                                alt={category.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.parentElement!.innerHTML = '<ImageIcon class="h-5 w-5 text-gray-400" />';
                                }}
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={category.isActive}
                              onCheckedChange={(checked) => handleToggleCategoryStatus(category.id, checked)}
                              disabled={isLoading}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onAddSubcategory(category.id)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteCategory(category.id)}
                                disabled={isLoading}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent asChild>
                        <>
                          {categorySubcategories.map((subcategory) => (
                            <TableRow key={subcategory.id} className="bg-gray-50/50">
                              <TableCell></TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2 pl-6">
                                  <FolderTreeIcon className="h-4 w-4 text-purple-600" />
                                  <span>{subcategory.name}</span>
                                </div>
                              </TableCell>
                              <TableCell className="max-w-xs truncate">{subcategory.description}</TableCell>
                              <TableCell>
                                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                                  <img 
                                    src={subcategory.imageUrl} 
                                    alt={subcategory.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                      target.parentElement!.innerHTML = '<ImageIcon class="h-5 w-5 text-gray-400" />';
                                    }}
                                  />
                                </div>
                              </TableCell>
                              <TableCell>
                                <Switch
                                  checked={subcategory.isActive}
                                  onCheckedChange={(checked) => handleToggleSubcategoryStatus(subcategory.id, checked)}
                                  disabled={isLoading}
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteSubcategory(subcategory.id)}
                                    disabled={isLoading}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CategoryTable;