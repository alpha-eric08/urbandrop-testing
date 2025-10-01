import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { 
  Edit, 
  Trash2, 
  Search, 
  ExternalLink,
  Calendar,
  LayoutGridIcon
} from "lucide-react";
import { useBanners } from "@/hooks/useBanners";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const BannerGrid = () => {
  const { banners, toggleBannerStatus, deleteBanner, isLoading } = useBanners();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBanners = banners.filter(banner =>
    banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    banner.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleStatus = async (bannerId: string) => {
    const result = await toggleBannerStatus(bannerId);
    if (result.success) {
      toast({
        title: "Success",
        description: "Banner status updated successfully",
      });
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (bannerId: string) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      const result = await deleteBanner(bannerId);
      if (result.success) {
        toast({
          title: "Success",
          description: "Banner deleted successfully",
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
              <LayoutGridIcon className="h-5 w-5" />
              Banner Gallery
            </CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search banners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBanners.map((banner, index) => (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <img 
                        src={banner.imageUrl} 
                        alt={banner.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge variant={banner.isActive ? "default" : "secondary"}>
                        {banner.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline">#{banner.position}</Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg">{banner.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{banner.description}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <Calendar className="h-3 w-3" />
                          Start: {format(new Date(banner.startDate), 'MMM dd, yyyy')}
                        </div>
                        {banner.endDate && (
                          <div className="flex items-center gap-1 text-sm text-red-600">
                            <Calendar className="h-3 w-3" />
                            End: {format(new Date(banner.endDate), 'MMM dd, yyyy')}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Active</span>
                          <Switch
                            checked={banner.isActive}
                            onCheckedChange={() => handleToggleStatus(banner.id)}
                            disabled={isLoading}
                          />
                        </div>
                        
                        <div className="flex items-center gap-1">
                          {banner.linkUrl && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(banner.linkUrl, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(banner.id)}
                            disabled={isLoading}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BannerGrid;