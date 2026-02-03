import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../redux/cartSlice";

const CartSidebar = ({ children }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:w-105 bg-white p-0 flex flex-col border-l border-black"
      >
        {/* Header */}
        <div className="p-6 border-b border-black flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Your Cart
            </h2>
            <p className="text-xs opacity-60 mt-1">
              {cartItems.length} items
            </p>
          </div>
          {cartItems.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500"
              onClick={() => dispatch(clearCart())}
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <ShoppingBag className="w-14 h-14 mb-4 opacity-30" />
            <p className="text-base font-medium">Your cart is empty</p>
            <p className="text-xs opacity-60 mb-6">
              Start adding products
            </p>
            <SheetClose asChild>
              <Link to="/">
                <Button
                  variant="outline"
                  className="border-black text-black rounded-none"
                >
                  Continue Shopping
                </Button>
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="relative flex gap-4 border border-black p-3"
                >
                  {/* Remove */}
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="absolute top-2 right-2 hover:opacity-60"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Image */}
                  <div className="w-20 h-20 border border-black shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs opacity-60">
                      {item.category || "Product"}
                    </p>

                    {/* Price + Quantity */}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-bold">
                        ${item.price.toFixed(2)}
                      </span>

                      <div className="flex items-center border border-black">
                        <button
                          onClick={() => dispatch(decreaseQty(item.id))}
                          className="px-2 py-1 hover:bg-black hover:text-white transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className="px-3 text-sm">{item.quantity}</span>

                        <button
                          onClick={() => dispatch(increaseQty(item.id))}
                          className="px-2 py-1 hover:bg-black hover:text-white transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-black space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>

              <p className="text-[10px] text-center opacity-60">
                Shipping & taxes calculated at checkout
              </p>

              <SheetClose asChild>
                <Link to="/checkout" className="block">
                  <Button className="w-full rounded-none bg-black text-white hover:bg-black/90">
                    Checkout
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
