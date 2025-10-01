import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Clock, CreditCard, User, Store } from "lucide-react";
import { ordersData, getOrderStatusColor, getPaymentStatusColor } from "@/assets/data/ordersData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function OrderView() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const orderId = searchParams.get("id");
  
  const order = ordersData.find(o => o.id === orderId);
  const [currentStatus, setCurrentStatus] = useState(order?.status || "Pending");

  if (!order) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-foreground">Order Not Found</h2>
          <p className="text-muted-foreground mt-2">The order you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/orders")} className="mt-4">
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleStatusUpdate = (newStatus: string) => {
    setCurrentStatus(newStatus as any);
    toast({
      title: "Status Updated",
      description: `Order status changed to ${newStatus}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/orders")}>
          <ArrowLeft size={16} />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Order Details</h1>
          <p className="text-muted-foreground">#{order.orderNumber}</p>
        </div>
        <div className="flex gap-2">
          <Badge className={getOrderStatusColor(currentStatus as any)}>
            {currentStatus}
          </Badge>
          <Badge className={getPaymentStatusColor(order.paymentStatus)}>
            {order.paymentStatus}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity} × {formatCurrency(item.price)}
                      </p>
                    </div>
                    <div className="font-medium text-foreground">
                      {formatCurrency(item.quantity * item.price)}
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center py-2">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-lg font-bold text-foreground">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={18} />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-1">Delivery Address</h4>
                <p className="text-muted-foreground">{order.deliveryAddress}</p>
              </div>
              {order.estimatedDeliveryTime && (
                <div>
                  <h4 className="font-medium text-foreground mb-1">Estimated Delivery Time</h4>
                  <p className="text-muted-foreground">{order.estimatedDeliveryTime}</p>
                </div>
              )}
              {order.deliveryDate && (
                <div>
                  <h4 className="font-medium text-foreground mb-1">Delivered At</h4>
                  <p className="text-muted-foreground">{formatDate(order.deliveryDate)}</p>
                </div>
              )}
              {order.notes && (
                <div>
                  <h4 className="font-medium text-foreground mb-1">Notes</h4>
                  <p className="text-muted-foreground">{order.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Management */}
          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Order Status
                </label>
                <Select value={currentStatus} onValueChange={handleStatusUpdate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Preparing">Preparing</SelectItem>
                    <SelectItem value="Ready">Ready</SelectItem>
                    <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={18} />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium text-foreground">{order.customerName}</p>
                <p className="text-sm text-muted-foreground">ID: {order.customerId}</p>
              </div>
            </CardContent>
          </Card>

          {/* Merchant Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store size={18} />
                Merchant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium text-foreground">{order.merchantName}</p>
                <p className="text-sm text-muted-foreground">ID: {order.merchantId}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard size={18} />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium text-foreground">{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Status</p>
                  <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                    {order.paymentStatus}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-lg font-bold text-foreground">
                    {formatCurrency(order.totalAmount)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock size={18} />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Order Placed</p>
                  <p className="font-medium text-foreground">{formatDate(order.orderDate)}</p>
                </div>
                {order.deliveryDate && (
                  <div>
                    <p className="text-sm text-muted-foreground">Delivered</p>
                    <p className="font-medium text-foreground">{formatDate(order.deliveryDate)}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}