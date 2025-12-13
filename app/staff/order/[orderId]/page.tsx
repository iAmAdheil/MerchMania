'use client'

import { useState } from "react";
import { ArrowLeft, Package, User, MapPin, Phone, Mail, Calendar, Truck, CreditCard, FileText, ChevronRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CustomSelect } from "../../page";

const ORDER_STATUS = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  MANUFACTURED: "MANUFACTURED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  RETURNED: "RETURNED",
} as const;

type OrderStatus = keyof typeof ORDER_STATUS;

// Modern, impactful status badges with refined colors
const statusColors: Record<OrderStatus, string> = {
  PENDING: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700/50",
  PROCESSING: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/50",
  MANUFACTURED: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-700/50",
  SHIPPED: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-700/50",
  DELIVERED: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700/50",
  CANCELLED: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700/50",
  RETURNED: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-700/50",
};

// Mock order data
const mockOrders: Record<string, any> = {
  "ORD-001": {
    id: "ORD-001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
    },
    shippingAddress: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    items: [
      { id: 1, name: "Urban Streetwear Tee", size: "M", color: "Black", quantity: 2, price: 45.00, influencer: "StyleQueen" },
      { id: 2, name: "Minimalist Logo Hoodie", size: "L", color: "Gray", quantity: 1, price: 89.00, influencer: "StyleQueen" },
    ],
    status: "PENDING",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    subtotal: 179.00,
    shipping: 9.99,
    total: 188.99,
    paymentMethod: "Credit Card",
    notes: "",
  },
  "ORD-002": {
    id: "ORD-002",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 987 654 3210",
    },
    shippingAddress: {
      street: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA",
    },
    items: [
      { id: 1, name: "Vintage Vibes Collection Tee", size: "S", color: "White", quantity: 1, price: 55.00, influencer: "TrendMaster" },
    ],
    status: "PROCESSING",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
    subtotal: 55.00,
    shipping: 5.99,
    total: 60.99,
    paymentMethod: "PayPal",
    notes: "Gift wrap requested",
  },
  "ORD-003": {
    id: "ORD-003",
    customer: {
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 555 123 4567",
    },
    shippingAddress: {
      street: "789 Pine Road",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "USA",
    },
    items: [
      { id: 1, name: "Bold Statement Tee", size: "XL", color: "Navy", quantity: 3, price: 40.00, influencer: "FashionGuru" },
      { id: 2, name: "Classic Fit Polo", size: "L", color: "White", quantity: 2, price: 65.00, influencer: "FashionGuru" },
    ],
    status: "MANUFACTURED",
    createdAt: "2024-01-13T08:15:00Z",
    updatedAt: "2024-01-15T11:00:00Z",
    subtotal: 250.00,
    shipping: 12.99,
    total: 262.99,
    paymentMethod: "Credit Card",
    notes: "",
  },
};

const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border/50">
    <div className="p-2 bg-primary/5 rounded-lg text-primary">
      <Icon className="w-5 h-5" />
    </div>
    <h3 className="text-base font-semibold text-foreground tracking-tight">{title}</h3>
  </div>
);

const DetailRow = ({ label, value, icon: Icon, href }: { label: string, value: string, icon?: any, href?: string }) => (
  <div className="flex items-start gap-4 py-3 first:pt-0 last:pb-0 group">
    {Icon && (
      <div className="mt-1 p-1.5 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        <Icon className="w-3.5 h-3.5" />
      </div>
    )}
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-muted-foreground mb-0.5">{label}</p>
      {href ? (
        <a href={href} className="text-sm font-medium text-foreground hover:text-primary transition-colors truncate block">
          {value}
        </a>
      ) : (
        <p className="text-sm font-medium text-foreground truncate">{value}</p>
      )}
    </div>
  </div>
);

const StaffOrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const router = useRouter();

  const order = orderId ? mockOrders[orderId] : null;
  const [status, setStatus] = useState<OrderStatus>(order?.status || "PENDING");
  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null);

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-sm mx-auto space-y-6">
          <div className="w-20 h-20 bg-muted rounded-2xl mx-auto flex items-center justify-center">
            <Package className="w-10 h-10 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Order Not Found</h1>
            <p className="text-muted-foreground mb-6">We couldn't locate order #{orderId}. It may have been deleted or the ID is incorrect.</p>
            <button
              onClick={() => router.back()}
              className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleStatusSelect = (newStatus: OrderStatus) => {
    if (newStatus === status) {
      setPendingStatus(null);
      return;
    }
    setPendingStatus(newStatus);
  };

  const confirmStatusChange = () => {
    if (pendingStatus) {
      setStatus(pendingStatus);
      setPendingStatus(null);
      // In a real app, you would make an API call here
    }
  };

  const cancelStatusChange = () => {
    setPendingStatus(null);
  };

  return (
    <div className="min-h-screen bg-muted/5 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <button
            onClick={() => router.back()}
            className="group inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
            Back
          </button>

          <div className="flex gap-3">
            <button className="inline-flex items-center px-4 py-2 bg-background border border-input rounded-lg text-sm font-medium hover:bg-accent transition-colors shadow-sm">
              <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
              Invoice
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
              <Truck className="w-4 h-4 mr-2" />
              Track
            </button>
          </div>
        </div>

        {/* Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">{order.id}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[status]}`}>
                {status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Placed on {new Date(order.createdAt).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Products List */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <SectionHeader icon={Package} title="Order Items" />
                <div className="space-y-6">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex gap-4 md:gap-6 group">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-muted/50 rounded-lg flex-shrink-0 flex items-center justify-center border border-border/50">
                        <Package className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex justify-between items-start gap-4">
                            <h4 className="font-semibold text-foreground text-lg">{item.name}</h4>
                            <p className="font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                            <span className="bg-muted px-2 py-0.5 rounded text-xs font-medium border border-border/50">
                              Size: {item.size}
                            </span>
                            <span className="flex items-center gap-1.5 bg-muted px-2 py-0.5 rounded text-xs font-medium border border-border/50">
                              <span className="w-2 h-2 rounded-full bg-current opacity-70" />
                              {item.color}
                            </span>
                            <span className="font-medium text-foreground">x{item.quantity}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-primary font-medium mt-2">
                          <User className="w-3.5 h-3.5" />
                          <span>Curated by @{item.influencer}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-muted/30 p-4 border-t border-border flex justify-end gap-2 text-sm">
                <span className="text-muted-foreground">Fulfillment Status:</span>
                <span className="font-medium text-foreground">Ready for Packing</span>
              </div>
            </div>

            {/* Customer & Shipping Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <SectionHeader icon={User} title="Customer Details" />
                <div className="space-y-4">
                  <DetailRow label="Full Name" value={order.customer.name} icon={User} />
                  <DetailRow label="Email Address" value={order.customer.email} icon={Mail} href={`mailto:${order.customer.email}`} />
                  <DetailRow label="Phone Number" value={order.customer.phone} icon={Phone} href={`tel:${order.customer.phone}`} />
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <SectionHeader icon={MapPin} title="Shipping Destination" />
                <p className="font-medium text-foreground mb-1">{order.customer.name}</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                  <p className="font-medium text-foreground mt-2">{order.shippingAddress.country}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <button className="text-xs font-medium text-primary hover:text-primary/80 flex items-center">
                    View on Map <ChevronRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Status Card */}
            <div className="bg-card border border-border rounded-xl shadow-sm p-6">
              <SectionHeader icon={Truck} title="Order Management" />
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Update Status
                  </label>
                  <CustomSelect
                    value={pendingStatus || status}
                    onChange={(value) => handleStatusSelect(value as OrderStatus)}
                    options={Object.keys(ORDER_STATUS).map((s) => ({ value: s, label: s }))}
                    placeholder="Select Status"
                    width="w-full"
                  />
                </div>

                {pendingStatus && pendingStatus !== status ? (
                  <div className="bg-background border border-border rounded-lg p-4 shadow-sm animate-in fade-in slide-in-from-top-2">
                    <p className="text-sm font-medium text-foreground mb-3">
                      Are you sure you want to update the status to <span className="text-primary font-bold">{pendingStatus}</span>?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={confirmStatusChange}
                        className="flex-1 bg-primary text-primary-foreground text-sm font-medium py-2 rounded-md hover:bg-primary/90 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={cancelStatusChange}
                        className="flex-1 bg-muted text-muted-foreground text-sm font-medium py-2 rounded-md hover:bg-muted/80 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg border border-border/50">
                    <p>Customer will receive an email notification when status changes.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-card border border-border rounded-xl shadow-sm p-6 sticky top-6">
              <SectionHeader icon={CreditCard} title="Order Summary" />

              <div className="space-y-3 pb-6 border-b border-border/50">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-foreground">${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium text-foreground">$0.00</span>
                </div>
              </div>

              <div className="flex justify-between items-end pt-4 mb-6">
                <span className="text-sm font-semibold text-muted-foreground">Total</span>
                <span className="text-2xl font-bold text-foreground">${order.total.toFixed(2)}</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-background rounded border border-border shadow-sm">
                      <CreditCard className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{order.paymentMethod}</span>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">Paid</span>
                </div>

                {order.notes && (
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4">
                    <p className="text-xs font-bold text-amber-800 dark:text-amber-500 uppercase tracking-wider mb-1">Customer Notes</p>
                    <p className="text-sm text-amber-900 dark:text-amber-200/80 italic">"{order.notes}"</p>
                  </div>
                )}

                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border bg-background hover:bg-muted font-medium text-sm transition-colors text-foreground">
                  <Mail className="w-4 h-4" />
                  Request Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffOrderDetail;