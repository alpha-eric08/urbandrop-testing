import React, { useRef, useEffect } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  imagePreview?: string;
  onImageChange: (file: File | null) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  required?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  imagePreview,
  onImageChange,
  className = "",
  size = "md",
  label = "Upload Image",
  required = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup blob URLs when component unmounts
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
      onImageChange(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32", 
    lg: "w-40 h-40"
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="flex items-center gap-4">
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`${sizeClasses[size]} border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors relative group`}
        >
          {imagePreview ? (
            <>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                type="button"
              >
                <X className="w-3 h-3" />
              </button>
            </>
          ) : (
            <div className="text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <span className="text-sm text-gray-500">Click to upload</span>
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
        
        <div className="text-sm text-muted-foreground">
          <p>Click to upload image</p>
          <p>JPG, PNG, WebP up to 10MB</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;