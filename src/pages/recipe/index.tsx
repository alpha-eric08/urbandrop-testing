import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChefHat, Plus, Search, Filter, Download, ChevronDown } from "lucide-react";
import RecipeTable from "./components/RecipeTable";
import RecipeForm from "./components/RecipeForm";
import RecipeView from "./components/RecipeView";
import { COUNTRIES, Recipe as APIRecipe, Country, Ingredient, PreparationStep, SocialLinks } from "@/assets/data/recipe";
import { exportToCSV, exportToJSON, exportToXML, exportToTXT, printCustomers } from "@/utils/exportUtils";
import { useRecipes, useCreateRecipe, useUpdateRecipe, useDeleteRecipe } from "@/hooks/useRecipes";
import type { RecipeResponse, CreateRecipeRequest, UpdateRecipeRequest } from "@/services/recipeService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Local interface that matches the component's data structure
interface LocalRecipe {
  id: string;
  name: string;
  image: string;
  estimatedTime: number;
  country: Country;
  ingredients: Ingredient[];
  preparationSteps: PreparationStep[];
  socialLinks: SocialLinks;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

const Recipes: React.FC = () => {
  const [currentView, setCurrentView] = useState<"table" | "form" | "view">("table");
  const [selectedRecipe, setSelectedRecipe] = useState<LocalRecipe | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");

  // API hooks
  const { data: recipesData = [], isLoading, error } = useRecipes();
  const createRecipeMutation = useCreateRecipe();
  const updateRecipeMutation = useUpdateRecipe();
  const deleteRecipeMutation = useDeleteRecipe();

  // Convert API data to local Recipe format
  const recipes: LocalRecipe[] = recipesData.map((apiRecipe: RecipeResponse) => {
    // Find country from COUNTRIES list
    const country = COUNTRIES.find(c => c.code === apiRecipe.country) || 
                   COUNTRIES.find(c => c.name === apiRecipe.country) || 
                   { code: apiRecipe.country || "", name: apiRecipe.country || "", flag: "" };

    // Handle ingredients conversion
    let ingredients: any[] = [];
    if (Array.isArray(apiRecipe.ingredients)) {
      if (typeof apiRecipe.ingredients[0] === 'string') {
        // Handle string array format
        ingredients = (apiRecipe.ingredients as string[]).map((ing, index) => ({
          id: crypto.randomUUID(),
          name: ing,
          quantity: "1",
          unit: "piece"
        }));
      } else if (Array.isArray(apiRecipe.ingredients[0])) {
        // Handle nested array format
        ingredients = ((apiRecipe.ingredients as unknown) as string[][]).flat().map((ing, index) => ({
          id: crypto.randomUUID(),
          name: ing,
          quantity: "1",
          unit: "piece"
        }));
      } else {
        // Handle object format
        ingredients = (apiRecipe.ingredients as Array<{id: any, name: string, quantity: any, unit: string}>).map(ing => ({
          id: crypto.randomUUID(),
          name: ing.name,
          quantity: ing.quantity?.toString() || "1",
          unit: ing.unit || "piece"
        }));
      }
    }

    // Handle preparation steps conversion
    let preparationSteps: any[] = [];
    if (Array.isArray(apiRecipe.preparation_steps)) {
      preparationSteps = (apiRecipe.preparation_steps as Array<{id: any, stepNumber: any, instruction: string}>).map(step => ({
        id: crypto.randomUUID(),
        stepNumber: typeof step.stepNumber === 'string' ? parseInt(step.stepNumber) || 1 : step.stepNumber,
        instruction: step.instruction
      }));
    } else if (typeof apiRecipe.preparation_steps === 'string') {
      preparationSteps = [{
        id: crypto.randomUUID(),
        stepNumber: 1,
        instruction: apiRecipe.preparation_steps
      }];
    }

    return {
      id: apiRecipe.id,
      name: apiRecipe.food_name || "",
      image: apiRecipe.image_url || "",
      estimatedTime: parseInt(apiRecipe.estimated_time || "30") || 30,
      country,
      ingredients,
      preparationSteps,
      socialLinks: {
        youtube: apiRecipe.youTube_link,
        facebook: apiRecipe.instagram_link || apiRecipe.facebook_link,
        tiktok: apiRecipe.tikTok_link
      },
      status: (apiRecipe.status as "draft" | "published") || "published",
      createdAt: apiRecipe.created_at,
      updatedAt: apiRecipe.created_at
    };
  });

  const handleCreateNew = () => {
    setSelectedRecipe(null);
    setIsEditing(false);
    setCurrentView("form");
  };

  const handleEdit = (recipe: LocalRecipe) => {
    setSelectedRecipe(recipe);
    setIsEditing(true);
    setCurrentView("form");
  };

  const handleView = (recipe: LocalRecipe) => {
    setSelectedRecipe(recipe);
    setCurrentView("view");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipeMutation.mutate(id);
    }
  };

  const handleFormSubmit = async (formData: FormData): Promise<void> => {
    // Extract data from FormData
    const name = formData.get('name') as string;
    const estimatedTime = formData.get('estimatedTime') as string;
    const country = formData.get('country') as string;
    const status = formData.get('status') as string;
    const imageFile = formData.get('imageFile') as File | null;
    const ingredients = JSON.parse(formData.get('ingredients') as string || '[]');
    const preparationSteps = JSON.parse(formData.get('preparationSteps') as string || '[]');
    const socialLinks = JSON.parse(formData.get('socialLinks') as string || '{}');

    if (isEditing && selectedRecipe) {
      // For updates, send proper structured data
      const updateData: UpdateRecipeRequest = {
        food_name: name,
        country: country,
        image_url: imageFile ? 'placeholder-for-uploaded-file' : selectedRecipe.image, // Handle file upload separately
        ingredients: ingredients.map((ing: any, index: number) => ({
          id: index + 1,
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit
        })),
        preparation_steps: preparationSteps.map((step: any, index: number) => ({
          id: index + 1,
          stepNumber: index + 1,
          instruction: step.instruction
        })),
        instagram_link: socialLinks.facebook,
        youTube_link: socialLinks.youtube,
        tikTok_link: socialLinks.tiktok,
        estimated_time: estimatedTime,
        status: status as "draft" | "published"
      };

      return new Promise<void>((resolve, reject) => {
        updateRecipeMutation.mutate(
          { recipeId: selectedRecipe.id, data: updateData },
          {
            onSuccess: () => {
              setCurrentView("table");
              setSelectedRecipe(null);
              setIsEditing(false);
              resolve();
            },
            onError: (error) => {
              reject(error);
            }
          }
        );
      });
    } else {
      // For creates, send proper structured data
      const createData: CreateRecipeRequest = {
        country: country,
        food_name: name,
        image_url: imageFile ? 'placeholder-for-uploaded-file' : '', // Handle file upload separately
        ingredients: ingredients.map((ing: any, index: number) => ({
          id: index + 1,
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit
        })),
        preparation_steps: preparationSteps.map((step: any, index: number) => ({
          id: index + 1,
          stepNumber: index + 1,
          instruction: step.instruction
        })),
        instagram_link: socialLinks.facebook,
        youTube_link: socialLinks.youtube,
        tikTok_link: socialLinks.tiktok,
        estimated_time: estimatedTime,
        status: status as "draft" | "published"
      };

      return new Promise<void>((resolve, reject) => {
        createRecipeMutation.mutate(createData, {
          onSuccess: () => {
            setCurrentView("table");
            setSelectedRecipe(null);
            setIsEditing(false);
            resolve();
          },
          onError: (error) => {
            reject(error);
          }
        });
      });
    }
  };

  const handleFormCancel = () => {
    setCurrentView("table");
    setSelectedRecipe(null);
    setIsEditing(false);
  };

  const handleViewClose = () => {
    setCurrentView("table");
    setSelectedRecipe(null);
  };

  // Filter recipes based on search term, status, and country
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = 
      (recipe.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (recipe.country?.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || recipe.status === statusFilter;
    const matchesCountry = countryFilter === "All" || (recipe.country?.name || "") === countryFilter;
    
    return matchesSearch && matchesStatus && matchesCountry;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleCountryFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryFilter(e.target.value);
  };

  const handleExport = (format: string) => {
    const exportData = filteredRecipes.map(recipe => ({
      id: recipe.id,
      name: recipe.name,
      country: recipe.country.name,
      estimatedTime: recipe.estimatedTime,
      status: recipe.status,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
      ingredients: recipe.ingredients.length,
      steps: recipe.preparationSteps.length
    }));

    switch (format) {
      case 'csv':
        exportToCSV(exportData as any, 'recipes');
        break;
      case 'json':
        exportToJSON(exportData as any, 'recipes');
        break;
      case 'xml':
        exportToXML(exportData as any, 'recipes');
        break;
      case 'txt':
        exportToTXT(exportData as any, 'recipes');
        break;
      case 'print':
        printCustomers(exportData as any);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ChefHat className="w-8 h-8 text-[#5cb35e]" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Recipe Management</h1>
                <p className="text-gray-600">Create, manage, and organize your recipes</p>
              </div>
            </div>
            {currentView === "table" && (
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Export
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleExport('csv')}>
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('json')}>
                      Export as JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('xml')}>
                      Export as XML
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('txt')}>
                      Export as TXT
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('print')}>
                      Print Recipes
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <button
                  onClick={handleCreateNew}
                  className="bg-[#5cb35e] text-white px-6 py-3 rounded-lg hover:bg-[#4a9f4d] transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Recipe
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Content */}
        {currentView === "table" && (
          <>
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5cb35e] focus:border-transparent"
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5cb35e] focus:border-transparent appearance-none bg-white"
                  >
                    <option value="All">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>

                {/* Country Filter */}
                <div className="relative">
                  <select
                    value={countryFilter}
                    onChange={handleCountryFilterChange}
                    className="w-full pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5cb35e] focus:border-transparent appearance-none bg-white"
                  >
                    <option value="All">All Countries</option>
                    {COUNTRIES.map(country => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-center text-sm text-gray-600">
                  {isLoading ? "Loading..." : `${filteredRecipes.length} of ${recipes.length} recipes`}
                </div>
              </div>
            </motion.div>

            <RecipeTable
              recipes={filteredRecipes}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              onCreateNew={handleCreateNew}
            />
          </>
        )}

        {currentView === "form" && (
          <RecipeForm
            recipe={selectedRecipe || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isEditing={isEditing}
          />
        )}

        {currentView === "view" && selectedRecipe && (
          <RecipeView
            recipe={selectedRecipe}
            onClose={handleViewClose}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default Recipes;
