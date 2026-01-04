'use client'

import { useState, useEffect } from "react";
import { ArrowLeft, Search, Filter, RefreshCw, ChevronDown, Check, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from '@/auth/auth-client';
import Loader from "@/components/Loader";

enum ORDER_STATUS {
  PENDING = "PENDING",
  PROCESSED = "PROCESSED",
  MANUFACTURED = "MANUFACTURED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  RETURNED = "RETURNED",
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: ORDER_STATUS;
  createdAt: string;
  shippingAddress: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    items: [
      { name: "Custom T-Shirt", quantity: 2, price: 29.99 },
      { name: "Hoodie", quantity: 1, price: 59.99 },
    ],
    total: 119.97,
    status: ORDER_STATUS.PENDING,
    createdAt: "2024-01-15T10:30:00Z",
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    items: [{ name: "Phone Case", quantity: 3, price: 19.99 }],
    total: 59.97,
    status: ORDER_STATUS.PROCESSED,
    createdAt: "2024-01-14T14:20:00Z",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
  },
  {
    id: "ORD-003",
    customerName: "Bob Wilson",
    customerEmail: "bob@example.com",
    items: [
      { name: "Mug", quantity: 5, price: 14.99 },
      { name: "Poster", quantity: 2, price: 24.99 },
    ],
    total: 124.93,
    status: ORDER_STATUS.MANUFACTURED,
    createdAt: "2024-01-13T09:15:00Z",
    shippingAddress: "789 Pine Rd, Chicago, IL 60601",
  },
  {
    id: "ORD-004",
    customerName: "Alice Brown",
    customerEmail: "alice@example.com",
    items: [{ name: "Tote Bag", quantity: 1, price: 34.99 }],
    total: 34.99,
    status: ORDER_STATUS.SHIPPED,
    createdAt: "2024-01-12T16:45:00Z",
    shippingAddress: "321 Elm St, Houston, TX 77001",
  },
  {
    id: "ORD-005",
    customerName: "Charlie Davis",
    customerEmail: "charlie@example.com",
    items: [{ name: "Hat", quantity: 2, price: 22.99 }],
    total: 45.98,
    status: ORDER_STATUS.PENDING,
    createdAt: "2024-01-11T11:00:00Z",
    shippingAddress: "654 Maple Dr, Phoenix, AZ 85001",
  },
];

const statusColors: Record<ORDER_STATUS, string> = {
  [ORDER_STATUS.PENDING]: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  [ORDER_STATUS.PROCESSED]: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  [ORDER_STATUS.MANUFACTURED]: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  [ORDER_STATUS.SHIPPED]: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  [ORDER_STATUS.DELIVERED]: "bg-green-500/20 text-green-400 border-green-500/30",
  [ORDER_STATUS.CANCELLED]: "bg-red-500/20 text-red-400 border-red-500/30",
  [ORDER_STATUS.RETURNED]: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

const StaffOrders = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    if (!isPending && session?.user.role !== 'staff') {
      router.push('/');
    }
  }, [router, isPending, session]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader size={60} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-row items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Order Management</h1>
              <p className="text-sm text-muted-foreground">Staff Portal</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search by Order ID, Customer Name, or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <CustomSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { label: "All Statuses", value: "ALL" },
                ...Object.values(ORDER_STATUS).map((status) => ({
                  label: status,
                  value: status,
                })),
              ]}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-400">
              {orders.filter((o) => o.status === ORDER_STATUS.PENDING).length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Processed</p>
            <p className="text-2xl font-bold text-blue-400">
              {orders.filter((o) => o.status === ORDER_STATUS.PROCESSED).length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Shipped</p>
            <p className="text-2xl font-bold text-cyan-400">
              {orders.filter((o) => o.status === ORDER_STATUS.SHIPPED).length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold text-foreground">{orders.length}</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground min-w-[120px]">Order ID</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground min-w-[250px]">Customer</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground min-w-[120px]">Items</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground min-w-[100px]">Total</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground min-w-[180px]">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground min-w-[150px]">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => router.push(`/staff/order/${order.id}`)}
                    className="border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 font-mono font-medium">{order.id}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td className="p-4">{order.items.length} item(s)</td>
                    <td className="p-4 font-medium">${order.total.toFixed(2)}</td>
                    <td className="p-4 text-muted-foreground">{formatDate(order.createdAt)}</td>
                    <td className="p-4">
                      <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${statusColors[order.status]}`}>
                        {order.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredOrders.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No orders found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffOrders;

interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  width?: string;
}

export const CustomSelect = ({ value, onChange, options, placeholder = "Select...", width = "w-[180px]" }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between h-10 ${width} rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-0"
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute top-full mt-2 ${width} rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95 z-50 bg-background`}>
            <div className="p-1 max-h-[300px] overflow-y-auto">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${value === option.value ? 'bg-accent text-accent-foreground' : ''}`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                  {value === option.value && <Check className="ml-auto h-4 w-4" />}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

