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
  Edit, 
  Trash2, 
  Search, 
  ExternalLink,
  Calendar,
  Image
} from "lucide-react";
import { useBanners } from "@/hooks/useBanners";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const BannerTable = () => {
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
              <Image className="h-5 w-5" />
              Banner Management
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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Banner</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBanners.map((banner) => (
                  <TableRow key={banner.id}>
                    <TableCell>
                      <div className="w-16 h-10 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                        <img 
                          src={banner.imageUrl} 
                          alt={banner.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = '<Image class="h-6 w-6 text-gray-400" />';
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{banner.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{banner.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{banner.position}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1 text-green-600">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(banner.startDate), 'MMM dd, yyyy')}
                        </div>
                        {banner.endDate && (
                          <div className="flex items-center gap-1 text-red-600 mt-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(banner.endDate), 'MMM dd, yyyy')}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={banner.isActive}
                        onCheckedChange={() => handleToggleStatus(banner.id)}
                        disabled={isLoading}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BannerTable;