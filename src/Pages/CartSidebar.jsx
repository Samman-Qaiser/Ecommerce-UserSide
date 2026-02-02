import React from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X, ShoppingBag } from 'lucide-react'; // ShoppingBag import miss tha
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const CartSidebar = ({ cartItems = [], children }) => {
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:w-112.5 bg-white p-0 flex flex-col shadow-2xl border-l">
        {/* Header - Styled Better */}
        <div className="p-6 border-b flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="size-5 " /> 
              Your Shopping Cart
            </h2>
            <p className="text-xs text-muted-foreground mt-1">{cartItems.length} Items</p>
          </div>
        
        </div>

        {/* Empty State */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <div className="bg-slate-100 p-6 rounded-full mb-4">
               <ShoppingBag className="size-12 text-slate-300" />
            </div>
            <p className="text-lg font-medium text-slate-900">Your cart is empty</p>
            <p className="text-sm text-slate-500 mb-6">Looks like you haven't added anything yet.</p>
            <SheetClose asChild>
              <Link to="/">
                <Button variant="outline" className="rounded-xl">Start Shopping</Button>
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id} // Use item.id only if it's unique
                  className="flex items-center gap-4 group transition-all"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-slate-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 truncate text-sm sm:text-base">{item.name}</h3>
                    <p className="text-xs text-slate-500 mb-1">{item.category || 'Product'}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold ">${item.price.toFixed(2)}</span>
                      <span className="text-xs text-slate-400">x {item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Section */}
            <div className="p-6 bg-slate-50 border-t space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Subtotal</span>
                <span className="font-bold text-xl text-slate-900">${totalAmount.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-slate-400 text-center">Shipping and taxes calculated at checkout</p>
              
              {/* FIXED: Wrap Link in SheetClose so it closes on navigation */}
              <SheetClose asChild>
                <Link to="/checkout" className="w-full block">
                  <Button className="w-full py-6 text-base font-bold rounded-none shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]">
                    Proceed to Checkout
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