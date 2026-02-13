import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Package,
  Search,
  ChevronRight,
  ShoppingBag,
  ArrowLeft,
  Loader2,
  Eye,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedButton from "../components/ui/AnimmatedButton";
import { Link, useNavigate } from "react-router-dom";
import { useOrder } from "../tanstackhooks/useOrders";
import { orderService } from "../services/ordersService";
import { toast } from "sonner";
import OrderTableSkeleton from "../components/ui/TableSekelton";

// Status Configuration
const statusConfig = {
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-100",
    dot: "bg-amber-500",
  },
  confirmed: {
    label: "Confirmed",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-100",
    dot: "bg-blue-500",
  },
  shipped: {
    label: "Shipped",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-100",
    dot: "bg-indigo-500",
  },
  delivered: {
    label: "Delivered",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100",
    dot: "bg-emerald-500",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-100",
    dot: "bg-rose-500",
  },
};

const Orders = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // ✅ For authenticated users - fetch orders
  const { orders, isLoading, refetch } = useOrder();

  // ✅ For guest tracking
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  // Format date helper
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    
    try {
      // Handle Firestore Timestamp
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return "N/A";
    }
  };
// Orders.jsx mein yeh add karo useEffect mein
useEffect(() => {
  console.log("🔍 Debug Info:");
  console.log("User:", user);
  console.log("Is Authenticated:", isAuthenticated);
  console.log("Orders:", orders);
  console.log("Is Loading:", isLoading);
}, [user, isAuthenticated, orders, isLoading]);
  // ✅ Guest Order Tracking
  const handleGuestOrderCheck = async (e) => {
    e.preventDefault();
    
    if (!email || !orderId) {
      toast.error("Please enter both email and order ID");
      return;
    }

    setIsTracking(true);
    
    try {
      console.log("🔍 Tracking order:", orderId);
      
      // Fetch order by order number
      const order = await orderService.getOrderByNumber(orderId);

      if (!order) {
        toast.error("Order not found. Please check your Order ID.");
        setIsTracking(false);
        return;
      }

      // Verify email matches (case-insensitive)
      // We need to get user email from userId
      const { userService } = await import("../services/userService");
      const orderUser = await userService.getUserById(order.userId);

      if (!orderUser || orderUser.email.toLowerCase() !== email.toLowerCase()) {
        toast.error("Email does not match this order");
        setIsTracking(false);
        return;
      }

      // ✅ Email matches - show order details
      toast.success("Order found! Redirecting...");
      navigate(`/order-confirmation/${orderId}`);

    } catch (error) {
      console.error("Error tracking order:", error);
      toast.error("Failed to track order. Please try again.");
    } finally {
      setIsTracking(false);
    }
  };

  // Empty Orders Component
  const EmptyOrders = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
        <ShoppingBag className="w-10 h-10 text-slate-300" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">No Orders Yet</h3>
      <p className="text-slate-500 mt-2 mb-8 max-w-70 mx-auto text-sm">
        Looks like you haven't discovered our collection yet.
      </p>
      <AnimatedButton
        to="/allcategories"
        align="center"
        label="Continue Shopping"
      />
    </div>
  );

  // ✅ AUTHENTICATED USER VIEW
  if (isAuthenticated) {
    return (
      <div className="max-w-5xl mx-auto p-6 md:p-10 min-h-[70vh]">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              My Orders
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage and track your recent purchases
            </p>
          </div>
          <Link to="/">
            <Button
              variant="outline"
              className="w-fit border-slate-200 text-xs font-bold uppercase tracking-wider h-10 px-6 rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Store
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
         <OrderTableSkeleton />
          </div>
        ) : orders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm shadow-slate-100/50">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableHead className="font-bold text-slate-900 py-5 pl-6">
                    Order Number
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Date
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Status
                  </TableHead>
                  <TableHead className="font-bold text-slate-900 text-right">
                    Total
                  </TableHead>
                  <TableHead className="font-bold text-slate-900 text-right pr-6">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.orderNumber}
                    className="border-slate-50 hover:bg-slate-50/30 transition-colors"
                  >
                    <TableCell className="font-medium py-5 pl-6">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm">
                      {formatDate(order.createdAt)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`
                        inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border
                        ${statusConfig[order.status]?.bg || "bg-slate-50"} 
                        ${statusConfig[order.status]?.text || "text-slate-600"} 
                        ${statusConfig[order.status]?.border || "border-slate-100"}
                      `}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            statusConfig[order.status]?.dot || "bg-slate-400"
                          }`}
                        />
                        {statusConfig[order.status]?.label || order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-bold text-slate-900">
                      ₹{order.total.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Link to={`/order-confirmation/${order.orderNumber}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs font-bold hover:bg-slate-100"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    );
  }

  // ✅ GUEST USER VIEW (Order Tracking)
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#fafafa]">
      <div className="w-full max-w-105 bg-white p-8 md:p-10 rounded-[24px] shadow-sm border border-slate-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-black text-white rounded-2xl mb-6 shadow-xl shadow-slate-200">
            <Package className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Track Order
          </h1>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Enter your email and order number to see the current status of your shipment.
          </p>
        </div>

        <form onSubmit={handleGuestOrderCheck} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 ml-1">
              Order Email
            </label>
            <Input
              type="email"
              placeholder="email@example.com"
              className="h-12 border-slate-200 focus-visible:ring-0 focus:border-black rounded-xl px-4 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 ml-1">
              Order Number
            </label>
            <Input
              type="text"
              placeholder="ORD-1000"
              className="h-12 border-slate-200 focus-visible:ring-0 focus:border-black rounded-xl px-4 transition-all"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value.toUpperCase())}
              required
            />
            <p className="text-xs text-slate-400 ml-1">
              Example: ORD-1000 (found in your confirmation email)
            </p>
          </div>

          <Button
            type="submit"
            disabled={isTracking}
            className="w-full h-12 bg-black hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-200 transition-all active:scale-[0.98] mt-2 disabled:opacity-50"
          >
            {isTracking ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Tracking...
              </>
            ) : (
              <>
                Track My Package
                <Search className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-[12px] text-slate-400">
          Need help?{" "}
          <Link to="/contactus">
            <button className="underline font-semibold text-slate-900 hover:text-black transition-colors">
              Contact Support
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Orders;