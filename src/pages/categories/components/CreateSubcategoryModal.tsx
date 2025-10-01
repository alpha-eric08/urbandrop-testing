import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/ImageUpload";
import { useCategories } from "@/hooks/useCategories";
import { useToast } from "@/hooks/use-toast";

const subcategorySchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  name: z.string().min(1, "Subcategory name is required"),
  description: z.string().min(1, "Description is required"),
  storageInstructions: z.string().optional(),
  allergyInfo: z.string().optional(),
  nutritionalBenefits: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean(),
});

type SubcategoryFormData = z.infer<typeof subcategorySchema>;

interface CreateSubcategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategoryId?: string;
}

const CreateSubcategoryModal = ({ open, onOpenChange, selectedCategoryId }: CreateSubcategoryModalProps) => {
  const { categories, createSubcategory, isLoading } = useCategories();
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const form = useForm<SubcategoryFormData>({
    resolver: zodResolver(subcategorySchema),
    defaultValues: {
      categoryId: selectedCategoryId || "",
      name: "",
      description: "",
      storageInstructions: "",
      allergyInfo: "",
      nutritionalBenefits: "",
      imageUrl: "",
      isActive: true,
    },
  });

  // Reset form when selectedCategoryId changes
  useEffect(() => {
    if (selectedCategoryId) {
      form.setValue("categoryId", selectedCategoryId);
    }
  }, [selectedCategoryId, form]);

  // Cleanup blob URLs when component unmounts or modal closes
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (file: File | null) => {
    // Revoke previous blob URL to prevent memory leaks
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }

    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setImagePreview(blobUrl);
      setImageFile(file);
    } else {
      setImagePreview("");
      setImageFile(null);
    }
  };

  const onSubmit = async (data: SubcategoryFormData) => {
    // Convert image file to base64 if present
    let imageUrl = data.imageUrl || "";
    if (imageFile) {
      const reader = new FileReader();
      imageUrl = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(imageFile);
      });
    }

    const subcategoryData = {
      categoryId: data.categoryId,
      name: data.name,
      description: data.description,
      storageInstructions: data.storageInstructions || '',
      allergyInfo: data.allergyInfo || '',
      nutritionalBenefits: data.nutritionalBenefits || '',
      imageUrl,
      isActive: data.isActive,
    };
    
    const result = await createSubcategory(subcategoryData);
    
    if (result.success) {
      toast({
        title: "Success",
        description: "Subcategory created successfully",
      });
      form.reset();
      setImageFile(null);
      setImagePreview("");
      onOpenChange(false);
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Subcategory</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategory Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter subcategory name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter subcategory description"
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="storageInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Storage Instructions</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter storage instructions"
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allergyInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergy Information</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter allergy information"
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nutritionalBenefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nutritional Benefits</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter nutritional benefits"
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <ImageUpload
                imagePreview={imagePreview}
                onImageChange={handleImageChange}
                label="Subcategory Image"
                size="md"
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Or Image URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Enable this subcategory to make it visible
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Subcategory"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubcategoryModal;