import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Package,
  Search,
  ChevronRight,
  ShoppingBag,
  ArrowLeft,
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
import { Link } from "react-router-dom";

// 1. Status Configuration (Keys should match exactly with data values)
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
  const { isAuthenticated } = useSelector((state) => state.auth);

  // 2. Dummy Data (Keys matched with statusConfig)
  const [orders] = useState([
    {
      id: "9921",
      date: "02 Feb 2024",
      orderStatus: "shipped",
      total: "12,500",
      items: "Banarasi Silk Saree",
    },
    {
      id: "8842",
      date: "28 Jan 2024",
      orderStatus: "pending",
      total: "8,900",
      items: "Cotton Chikankari Suit",
    },
    {
      id: "7710",
      date: "15 Jan 2024",
      orderStatus: "delivered",
      total: "22,000",
      items: "Designer Bridal Lehenga",
    },
  ]);

  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");

  const handleGuestOrderCheck = (e) => {
    e.preventDefault();
    console.log("Guest Order Check:", { email, orderId });
  };

  const EmptyOrders = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
        <ShoppingBag className="w-10 h-10 text-slate-300" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">No Orders Yet</h3>
      <p className="text-slate-500 mt-2 mb-8 max-w-70 mx-auto text-sm">
        Looks like you haven't discovered our  collection yet.
      </p>
      <AnimatedButton
        to="/allcategories"
        align="center"
        label="Continue Shopping"
      />
    </div>
  );

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

        {orders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm shadow-slate-100/50">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableHead className="font-bold text-slate-900 py-5 pl-6">
                    Order ID
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Date
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Status
                  </TableHead>
                  <TableHead className="font-bold text-slate-900 text-right pr-6">
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="border-slate-50 hover:bg-slate-50/30 transition-colors cursor-pointer"
                  >
                    <TableCell className="font-medium py-5 pl-6">
                      #ORD-{order.id}
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm">
                      {order.date}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`
                        inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border
                        ${statusConfig[order.orderStatus]?.bg || "bg-slate-50"} 
                        ${statusConfig[order.orderStatus]?.text || "text-slate-600"} 
                        ${statusConfig[order.orderStatus]?.border || "border-slate-100"}
                      `}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-2 ${statusConfig[order.orderStatus]?.dot || "bg-slate-400"}`}
                        />
                        {statusConfig[order.orderStatus]?.label ||
                          order.orderStatus}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-bold text-slate-900 pr-6">
                      Rs. {order.total}
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
            Enter your details to see the current status of your shipment.
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
              Order ID
            </label>
            <Input
              type="text"
              placeholder="ORD-12345"
              className="h-12 border-slate-200 focus-visible:ring-0 focus:border-black rounded-xl px-4 transition-all"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-200 transition-all active:scale-[0.98] mt-2"
          >
            Track My Package
            <Search className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <p className="mt-8 text-center text-[12px] text-slate-400">
          Need help?{" "}
          <button className="underline font-semibold text-slate-900 hover:text-black transition-colors">
            Contact Support
          </button>
        </p>
      </div>
    </div>
  );
};

export default Orders;
