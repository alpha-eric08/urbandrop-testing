import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageSquare, Mail, Phone, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { supportTickets, type SupportTicket } from "@/assets/data/supportTickets";
import { merchantsData } from "@/assets/data/merchantsData";
import { customers } from "@/assets/data/customersData";

const contactSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  priority: z.string().min(1, "Please select a priority"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const categories = [
  "Technical Issue",
  "Account Management",
  "Billing",
  "Feature Request",
  "Bug Report",
  "General Inquiry",
];

const priorities = [
  { value: "low", label: "Low", color: "bg-green-500" },
  { value: "medium", label: "Medium", color: "bg-yellow-500" },
  { value: "high", label: "High", color: "bg-orange-500" },
  { value: "urgent", label: "Urgent", color: "bg-red-500" },
];

const supportChannels = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email",
    contact: "support@urbandrop.io",
    responseTime: "Within 24 hours",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak with our team",
    contact: "+233 50 123 4567",
    responseTime: "Mon-Fri 9AM-6PM",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with support",
    contact: "Available 24/7",
    responseTime: "Usually under 5 minutes",
  },
];

export default function ContactSupport() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Support ticket:", data);
    toast.success("Support ticket submitted successfully! We'll get back to you soon.");
    reset();
    setIsSubmitting(false);
  };

  const selectedPriority = priorities.find(p => p.value === watch("priority"));

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Contact Support</h1>
          <p className="text-muted-foreground">
            Get help from our support team or submit a ticket
          </p>
        </div>
      </div>

      {/* Support Tickets List */}
      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supportTickets.map((t) => {
                  const name = t.entityType === 'merchant'
                    ? merchantsData.find(m => m.id === t.entityId)?.merchantName || t.entityId
                    : customers.find(c => c.id === t.entityId)?.name || t.entityId;
                  const priorityColor = {
                    low: 'bg-green-100 text-green-800',
                    medium: 'bg-yellow-100 text-yellow-800',
                    high: 'bg-orange-100 text-orange-800',
                    urgent: 'bg-red-100 text-red-800'
                  }[t.priority];
                  const statusColor = {
                    open: 'bg-blue-100 text-blue-800',
                    in_progress: 'bg-purple-100 text-purple-800',
                    resolved: 'bg-green-100 text-green-800',
                    closed: 'bg-gray-100 text-gray-800'
                  }[t.status];
                  return (
                    <TableRow key={t.id}>
                      <TableCell className="font-mono text-blue-600">{t.id}</TableCell>
                      <TableCell className="font-medium">{t.subject}</TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell className="capitalize">{t.entityType}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColor}`}>{t.priority}</span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>{t.status.replace('_',' ')}</span>
                      </TableCell>
                      <TableCell className="uppercase text-xs">{t.channel}</TableCell>
                      <TableCell>{new Date(t.created_at).toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="secondary">View</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableCaption>A list of the latest support tickets</TableCaption>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Ticket</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => setValue("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-red-500">{errors.category.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority *</Label>
                    <Select onValueChange={(value) => setValue("priority", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map(priority => (
                          <SelectItem key={priority.value} value={priority.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${priority.color}`} />
                              {priority.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.priority && (
                      <p className="text-sm text-red-500">{errors.priority.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-500">{errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Please provide detailed information about your issue..."
                    rows={6}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Support Ticket"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Support Channels */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Other Ways to Get Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {supportChannels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-medium">{channel.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {channel.description}
                        </p>
                        <p className="text-sm font-medium">{channel.contact}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {channel.responseTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">All systems operational</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Average response time: 2 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span className="text-sm">24/7 chat support available</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}