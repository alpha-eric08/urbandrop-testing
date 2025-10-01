import React from "react";
import { motion } from "framer-motion";
import {
  X,
  Clock,
  Globe,
  Users,
  Youtube,
  Facebook,
  Smartphone,
  Edit3,
  ExternalLink,
} from "lucide-react";
import { Recipe as APIRecipe, COUNTRIES, Country, Ingredient, PreparationStep, SocialLinks } from "@/assets/data/recipe";
import { convertDataUrlToBlobUrl } from "@/utils/imageUtils";

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

interface RecipeViewProps {
  recipe: LocalRecipe;
  onClose: () => void;
  onEdit: (recipe: LocalRecipe) => void;
}

const RecipeView: React.FC<RecipeViewProps> = ({ recipe, onClose, onEdit }) => {
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minutes`
      : `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  const getSocialLinkIcon = (type: string) => {
    switch (type) {
      case "youtube":
        return { icon: Youtube, color: "text-red-600", label: "YouTube" };
      case "facebook":
        return { icon: Facebook, color: "text-blue-600", label: "Facebook" };
      case "tiktok":
        return { icon: Smartphone, color: "text-black", label: "TikTok" };
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[1030]"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{recipe.name}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(recipe)}
              className="p-2 text-gray-400 hover:text-[#5cb35e] transition-colors"
            >
              <Edit3 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="p-6 space-y-8">
            {/* Recipe Image and Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {recipe.image ? (
                  <img
                    src={convertDataUrlToBlobUrl(recipe.image)}
                    alt={recipe.name}
                    className="w-full h-64 object-cover rounded-lg border border-gray-200"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{recipe.estimatedTime} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe className="w-5 h-5" />
                    <span className="font-medium">
                      {recipe.country.flag} {recipe.country.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">
                    Status: 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      recipe.status === "published" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {(recipe.status || "draft").charAt(0).toUpperCase() + (recipe.status || "draft").slice(1)}
                    </span>
                  </span>
                </div>

                {/* Social Links */}
                {(recipe.socialLinks.youtube || recipe.socialLinks.facebook || recipe.socialLinks.tiktok) && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Social Links</h4>
                    <div className="space-y-2">
                      {[
                        { platform: "youtube", url: recipe.socialLinks.youtube },
                        { platform: "facebook", url: recipe.socialLinks.facebook },
                        { platform: "tiktok", url: recipe.socialLinks.tiktok }
                      ].map(({ platform, url }) => {
                        if (!url) return null;
                        const linkInfo = getSocialLinkIcon(platform);
                        if (!linkInfo) return null;
                        
                        const { icon: Icon, color, label } = linkInfo;
                        return (
                          <a
                            key={platform}
                            href={url as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm hover:underline"
                          >
                            <Icon className={`w-4 h-4 ${color}`} />
                            <span className="text-gray-700">{label}</span>
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Ingredients ({recipe.ingredients.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={ingredient.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm font-medium text-gray-600 w-6">
                      {index + 1}.
                    </span>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">
                        {ingredient.name}
                      </span>
                      {(ingredient.quantity || ingredient.unit) && (
                        <span className="text-gray-600 ml-2">
                          ({ingredient.quantity} {ingredient.unit})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation Steps */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Preparation Steps ({recipe.preparationSteps.length})
              </h3>
              <div className="space-y-4">
                {recipe.preparationSteps.map((step) => (
                  <div
                    key={step.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-[#5cb35e] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.stepNumber}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 leading-relaxed">
                        {step.instruction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <div className="pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(recipe.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span>{" "}
                  {new Date(recipe.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RecipeView;
