import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export default function OrderCreate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    customerName: "",
    customerId: "",
    merchantName: "",
    merchantId: "",
    deliveryAddress: "",
    paymentMethod: "",
    notes: "",
    estimatedDeliveryTime: ""
  });

  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: "1", name: "", quantity: 1, price: 0 }
  ]);

  const addOrderItem = () => {
    const newItem: OrderItem = {
      id: Date.now().toString(),
      name: "",
      quantity: 1,
      price: 0
    };
    setOrderItems([...orderItems, newItem]);
  };

  const removeOrderItem = (id: string) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter(item => item.id !== id));
    }
  };

  const updateOrderItem = (id: string, field: keyof OrderItem, value: string | number) => {
    setOrderItems(orderItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.customerName || !formData.merchantName || !formData.deliveryAddress) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const hasValidItems = orderItems.some(item => item.name && item.price > 0);
    if (!hasValidItems) {
      toast({
        title: "Validation Error", 
        description: "Please add at least one valid item",
        variant: "destructive"
      });
      return;
    }

    // Generate order number
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    
    toast({
      title: "Order Created",
      description: `Order ${orderNumber} has been created successfully`,
    });

    // Navigate back to orders list
    navigate("/orders");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/orders")}>
          <ArrowLeft size={16} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create New Order</h1>
          <p className="text-muted-foreground">Add a new order to the system</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer & Merchant Info */}
            <Card>
              <CardHeader>
                <CardTitle>Customer & Merchant Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Customer Name *</Label>
                    <Input
                      id="customerName"
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                      placeholder="Enter customer name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerId">Customer ID</Label>
                    <Input
                      id="customerId"
                      value={formData.customerId}
                      onChange={(e) => setFormData({...formData, customerId: e.target.value})}
                      placeholder="Enter customer ID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="merchantName">Merchant Name *</Label>
                    <Input
                      id="merchantName"
                      value={formData.merchantName}
                      onChange={(e) => setFormData({...formData, merchantName: e.target.value})}
                      placeholder="Enter merchant name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="merchantId">Merchant ID</Label>
                    <Input
                      id="merchantId"
                      value={formData.merchantId}
                      onChange={(e) => setFormData({...formData, merchantId: e.target.value})}
                      placeholder="Enter merchant ID"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Order Items</CardTitle>
                <Button type="button" onClick={addOrderItem} size="sm" variant="outline">
                  <Plus size={16} className="mr-2" />
                  Add Item
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderItems.map((item, index) => (
                  <div key={item.id} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                      <div className="md:col-span-2">
                        <Label htmlFor={`item-name-${item.id}`}>Item Name</Label>
                        <Input
                          id={`item-name-${item.id}`}
                          value={item.name}
                          onChange={(e) => updateOrderItem(item.id, "name", e.target.value)}
                          placeholder="Enter item name"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`item-quantity-${item.id}`}>Quantity</Label>
                        <Input
                          id={`item-quantity-${item.id}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateOrderItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Label htmlFor={`item-price-${item.id}`}>Price ($)</Label>
                          <Input
                            id={`item-price-${item.id}`}
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => updateOrderItem(item.id, "price", parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                          />
                        </div>
                        {orderItems.length > 1 && (
                          <Button 
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeOrderItem(item.id)}
                            className="mt-6"
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </div>
                    </div>
                    {index < orderItems.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Delivery & Payment */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery & Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                  <Textarea
                    id="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
                    placeholder="Enter full delivery address"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({...formData, paymentMethod: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="Debit Card">Debit Card</SelectItem>
                        <SelectItem value="PayPal">PayPal</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="estimatedDeliveryTime">Estimated Delivery Time</Label>
                    <Input
                      id="estimatedDeliveryTime"
                      value={formData.estimatedDeliveryTime}
                      onChange={(e) => setFormData({...formData, estimatedDeliveryTime: e.target.value})}
                      placeholder="e.g., 30 mins"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Any special instructions or notes"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name || "Unnamed Item"} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.quantity * item.price)}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(calculateTotal())}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button type="submit" className="w-full">
                  Create Order
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/orders")}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}