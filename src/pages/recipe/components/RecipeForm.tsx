import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  X,
  Upload,
  Clock,
  Globe,
  ChefHat,
  List,
  Youtube,
  Facebook,
  Smartphone,
  Save,
  Eye,
} from "lucide-react";
import { Recipe as APIRecipe, Ingredient, PreparationStep, SocialLinks, Country, COUNTRIES  } from "@/assets/data/recipe";

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

interface RecipeFormProps {
  recipe?: LocalRecipe;
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  recipe,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    name: recipe?.name || "",
    estimatedTime: recipe?.estimatedTime || 30,
    country: recipe?.country || COUNTRIES[0],
    status: recipe?.status || "draft" as "draft" | "published",
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    recipe?.ingredients || [
      { id: "1", name: "", quantity: "", unit: "" },
    ]
  );

  const [preparationSteps, setPreparationSteps] = useState<PreparationStep[]>(
    recipe?.preparationSteps || [
      { id: "1", stepNumber: 1, instruction: "" },
    ]
  );

  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    youtube: recipe?.socialLinks?.youtube || "",
    facebook: recipe?.socialLinks?.facebook || "",
    tiktok: recipe?.socialLinks?.tiktok || "",
  });

  const [imagePreview, setImagePreview] = useState<string>(recipe?.image || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup blob URLs when component unmounts or when new image is selected
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke previous blob URL to prevent memory leaks
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      
      // Create blob URL for preview
      const blobUrl = URL.createObjectURL(file);
      setImagePreview(blobUrl);
      setImageFile(file);
    }
  };

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: "",
      quantity: "",
      unit: "",
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: string) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };

  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(ing => ing.id !== id));
    }
  };

  const addPreparationStep = () => {
    const newStep: PreparationStep = {
      id: Date.now().toString(),
      stepNumber: preparationSteps.length + 1,
      instruction: "",
    };
    setPreparationSteps([...preparationSteps, newStep]);
  };

  const updatePreparationStep = (id: string, instruction: string) => {
    setPreparationSteps(preparationSteps.map(step => 
      step.id === id ? { ...step, instruction } : step
    ));
  };

  const removePreparationStep = (id: string) => {
    if (preparationSteps.length > 1) {
      const updatedSteps = preparationSteps
        .filter(step => step.id !== id)
        .map((step, index) => ({ ...step, stepNumber: index + 1 }));
      setPreparationSteps(updatedSteps);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent multiple submissions
    
    setIsSubmitting(true);
    
    try {
      // Create FormData object
      const formDataObj = new FormData();
      
      // Append basic fields
      formDataObj.append('name', formData.name);
      formDataObj.append('estimatedTime', formData.estimatedTime.toString());
      formDataObj.append('country', formData.country.code);
      formDataObj.append('status', formData.status);
      
      // Append image file if exists
      if (imageFile) {
        formDataObj.append('imageFile', imageFile);
      }
      
      // Append complex objects as JSON strings
      formDataObj.append('ingredients', JSON.stringify(
        ingredients.filter(ing => ing.name.trim() !== "")
      ));
      formDataObj.append('preparationSteps', JSON.stringify(
        preparationSteps.filter(step => step.instruction.trim() !== "")
      ));
      formDataObj.append('socialLinks', JSON.stringify(socialLinks));

      await onSubmit(formDataObj);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? "Edit Recipe" : "Create New Recipe"}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <ChefHat className="w-5 h-5 mr-2 text-[#5cb35e]" />
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipe Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5cb35e] focus:border-transparent"
                placeholder="Enter recipe name"
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Estimated Time (minutes) *
              </label>
              <input
                type="number"
                value={formData.estimatedTime}
                onChange={(e) => setFormData(prev => ({ ...prev, estimatedTime: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5cb35e] focus:border-transparent"
                placeholder="30"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Globe className="w-4 h-4 mr-1" />
              Country of Origin *
            </label>
            <select
              value={formData.country.code}
              onChange={(e) => {
                const selectedCountry = COUNTRIES.find(c => c.code === e.target.value);
                if (selectedCountry) {
                  setFormData(prev => ({ ...prev, country: selectedCountry }));
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5cb35e] focus:border-transparent"
              required
            >
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Image
            </label>
            <div className="flex items-center gap-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#5cb35e] transition-colors"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Recipe preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-500">Upload Image</span>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="text-sm text-gray-500">
                <p>Click to upload recipe image</p>
                <p>Recommended: 400x300px</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <List className="w-5 h-5 mr-2 text-[#5cb35e]" />
            Ingredients
          </h3>

          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-sm font-medium text-gray-600 w-8">
                {index + 1}.
              </span>
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => updateIngredient(ingredient.id, "name", e.target.value)}
                placeholder="Ingredient name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5cb35e] focus:border-transparent"
              />
              <input
                type="text"
                value={ingredient.quantity}
                onChange={(e) => updateIngredient(ingredient.id, "quantity", e.target.value)}
                placeholder="Qty"
                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5cb35e] focus:border-transparent"
              />
              <input
                type="text"
                value={ingredient.unit}
                onChange={(e) => updateIngredient(ingredient.id, "unit", e.target.value)}
                placeholder="Unit"
                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5cb35e] focus:border-transparent"
              />
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={addIngredient}
                  className="p-2 text-[#5cb35e] hover:bg-green-50 rounded-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(ingredient.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Preparation Steps */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <List className="w-5 h-5 mr-2 text-[#5cb35e]" />
            Preparation Steps
          </h3>

          {preparationSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-sm font-medium text-gray-600 w-8 mt-2">
                {step.stepNumber}.
              </span>
              <textarea
                value={step.instruction}
                onChange={(e) => updatePreparationStep(step.id, e.target.value)}
                placeholder="Describe this preparation step..."
                rows={3}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5cb35e] focus:border-transparent resize-none"
              />
              <div className="flex gap-1 mt-2">
                <button
                  type="button"
                  onClick={addPreparationStep}
                  className="p-2 text-[#5cb35e] hover:bg-green-50 rounded-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                {preparationSteps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePreparationStep(step.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Youtube className="w-4 h-4 mr-1 text-red-600" />
                YouTube
              </label>
              <input
                type="url"
                value={socialLinks.youtube || ""}
                onChange={(e) => setSocialLinks(prev => ({ ...prev, youtube: e.target.value }))}
                placeholder="https://youtube.com/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5cb35e] focus:border-transparent"
              />
            </div>
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Facebook className="w-4 h-4 mr-1 text-blue-600" />
                Facebook
              </label>
              <input
                type="url"
                value={socialLinks.facebook || ""}
                onChange={(e) => setSocialLinks(prev => ({ ...prev, facebook: e.target.value }))}
                placeholder="https://facebook.com/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5cb35e] focus:border-transparent"
              />
            </div>
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Smartphone className="w-4 h-4 mr-1 text-black" />
                TikTok
              </label>
              <input
                type="url"
                value={socialLinks.tiktok || ""}
                onChange={(e) => setSocialLinks(prev => ({ ...prev, tiktok: e.target.value }))}
                placeholder="https://tiktok.com/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5cb35e] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as "draft" | "published" }))}
            className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5cb35e] focus:border-transparent"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#5cb35e] text-white px-6 py-2 rounded-md hover:bg-[#4a9f4d] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? "Saving..." : (isEditing ? "Update Recipe" : "Save Recipe")}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default RecipeForm;
