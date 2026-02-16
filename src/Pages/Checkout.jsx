import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea' // ✅ Add this
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, increaseQty, decreaseQty, clearCart } from "../redux/cartSlice";
import { Trash2, Minus, Plus, CreditCard, Truck, Lock, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
// Hooks & Services
import { userService } from "../services/userService";
import { orderService } from "../services/ordersService"; // ✅ Import
import { setGuestUser } from "../redux/authSlice";

const CheckoutPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const cartItems = useSelector((state) => state.cart.items);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // ============================================
  // CALCULATIONS
  // ============================================
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const codShippingFee = 300
  const codAdvancePayment = 500
  
  const shippingFee = paymentMethod === 'cod' ? codShippingFee : 0;
  const totalAmount = subtotal + shippingFee;
  const stripeAmount = paymentMethod === 'cod' ? codAdvancePayment : totalAmount;
  const codAmountRemaining = paymentMethod === 'cod' ? (totalAmount - codAdvancePayment) : 0;

  // ============================================
  // CART ACTIONS
  // ============================================
  const handleIncreaseQty = (itemId) => {
    dispatch(increaseQty(itemId));
  };

  const handleDecreaseQty = (itemId) => {
    dispatch(decreaseQty(itemId));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  // ============================================
  // SUBMIT HANDLER
  // ============================================
  const onSubmit = async (data) => {
    if (cartItems.length === 0) return alert("Your cart is empty!");
    
    setIsProcessing(true);
    try {
      let finalUser = user;

      // ✅ STEP 1: Create/Update Guest Profile if not authenticated
      if (!isAuthenticated) {
        console.log("Creating/Updating Guest Profile...");
        const guestData = {
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber || "",
          address: {
            street: data.address,
            city: data.city,
            state: data.state,
            zip: data.zip,
          }
        };

        const createdGuest = await userService.createGuestUser(guestData);
        dispatch(setGuestUser(createdGuest));
        finalUser = createdGuest;
      }

      // ✅ STEP 2: Create Order
      console.log("Creating order...");
      const orderData = {
        userId: finalUser.uid,
        items: cartItems,
        address: {
          street: data.address,
          city: data.city,
          state: data.state,
          zipcode: data.zip,
          country: "Pakistan",
        },
        orderNote: data.orderNote || "",
        paymentMethod: paymentMethod,
        subtotal: subtotal,
        shippingCost: shippingFee,
        discount: "",
        total: totalAmount,
        stripePaymentId: "", // Will be updated after Stripe payment
      };

      const createdOrder = await orderService.createOrder(orderData);
      console.log("✅ Order created:", createdOrder.orderNumber);

      // ✅ STEP 3: Process Stripe Payment
      console.log("Processing Stripe Payment for:", stripeAmount);
      
      // TODO: Add Stripe payment logic here
      // After successful payment:
      // await orderService.updatePaymentStatus(
      //   createdOrder.orderNumber, 
      //   'paid', 
      //   stripePaymentIntentId
      // );

      // ✅ STEP 4: Success
      toast.success(`Order ${createdOrder.orderNumber} placed successfully!`);
      
      // Cleanup
      dispatch(clearCart());
      navigate(`/order-confirmation/${createdOrder.orderNumber}`);

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Error: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-12 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Form */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Checkout</h2>
            <p className="text-slate-500 mt-2">Enter your shipping and payment details.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Shipping Information */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
              <h3 className="text-lg font-semibold border-b pb-3">Shipping Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-slate-500">Full Name</Label>
                  <Input 
                    defaultValue={user?.fullName || ""}
                    placeholder="John Doe" 
                    className="bg-slate-50 border-none h-11" 
                    {...register('fullName', { required: 'Name is required' })} 
                  />
                  {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-slate-500">Email Address</Label>
                  <Input 
                    defaultValue={user?.email || ""}
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-slate-50 border-none h-11" 
                    {...register('email', { required: 'Email is required' })} 
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase font-bold text-slate-500">Phone Number (Optional)</Label>
                <Input 
                  defaultValue={user?.phoneNumber || ""}
                  type="tel" 
                  placeholder="Enter Your Phone Number" 
                  className="bg-slate-50 border-none h-11" 
                  {...register('phoneNumber')} 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase font-bold text-slate-500">Street Address</Label>
                <Input 
                  placeholder="123 Luxury Lane" 
                  className="bg-slate-50 border-none h-11" 
                  {...register('address', { required: 'Address is required' })} 
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-slate-500">City</Label>
                  <Input placeholder="Rawalpindi" className="bg-slate-50 border-none h-11" {...register('city', { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-slate-500">State</Label>
                  <Input placeholder="Punjab" className="bg-slate-50 border-none h-11" {...register('state', { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-slate-500">ZIP</Label>
                  <Input placeholder="46000" className="bg-slate-50 border-none h-11" {...register('zip', { required: true })} />
                </div>
              </div>

              {/* ✅ NEW: Order Note */}
              <div className="space-y-2">
                <Label className="text-xs uppercase font-bold text-slate-500">Order Note (Optional)</Label>
                <Textarea 
                  placeholder="Any special instructions for your order..." 
                  className="bg-slate-50 border-none min-h-20 resize-none" 
                  {...register('orderNote')} 
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
              <h3 className="text-lg font-semibold border-b pb-3">Payment Method</h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Label htmlFor="cod" className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-black bg-slate-50 ring-1 ring-black' : 'border-slate-200'}`}>
                  <RadioGroupItem value="cod" id="cod" />
                  <Truck className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="font-bold text-sm">COD (Partial Advance)</p>
                    <p className="text-[10px] text-slate-500">Pay ₹500 now</p>
                  </div>
                </Label>

                <Label htmlFor="prepaid" className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'prepaid' ? 'border-black bg-slate-50 ring-1 ring-black' : 'border-slate-200'}`}>
                  <RadioGroupItem value="prepaid" id="prepaid" />
                  <CreditCard className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="font-bold text-sm">Full Prepaid</p>
                    <p className="text-[10px] text-green-600 font-bold">Free Shipping</p>
                  </div>
                </Label>
              </RadioGroup>
            </div>

            <Button 
              disabled={isProcessing}
              type="submit" 
              className="w-full h-14 text-lg font-bold bg-black text-white hover:bg-slate-800 rounded-none transition-all shadow-xl"
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                paymentMethod === 'cod' ? `Pay ₹${stripeAmount} Advance` : `Pay ₹${totalAmount.toLocaleString()}`
              )}
            </Button>
          </form>
        </div>

        {/* Right Side: Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl sticky top-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="max-h-80 overflow-y-auto space-y-4 mb-6 pr-2">
              {cartItems.length === 0 ? (
                <p className="text-slate-400 text-center py-8">Your cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-slate-100">
                    <div className="w-20 h-24 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold line-clamp-2 mb-2">{item.name}</h4>
                      <p className="text-sm font-bold mb-2">₹{(item.price * item.quantity).toLocaleString()}</p>
                      
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDecreaseQty(item.id)}
                          className="w-7 h-7 flex items-center justify-center border border-slate-300 rounded-md hover:bg-slate-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        
                        <span className="text-sm font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          type="button"
                          onClick={() => handleIncreaseQty(item.id)}
                          className="w-7 h-7 flex items-center justify-center border border-slate-300 rounded-md hover:bg-slate-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Shipping</span>
                <span className={shippingFee === 0 ? "text-green-600 font-bold" : ""}>
                  {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-black">₹{totalAmount.toLocaleString()}</span>
              </div>
              
              {paymentMethod === 'cod' && (
                <div className="bg-blue-50 p-3 rounded-lg mt-4 text-[11px]">
                  <div className="flex justify-between text-blue-700">
                    <span>Payable Now (Stripe):</span>
                    <span className="font-bold">₹{codAdvancePayment}</span>
                  </div>
                  <div className="flex justify-between text-blue-900 mt-1">
                    <span>Due on Delivery:</span>
                    <span className="font-bold">₹{codAmountRemaining.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <Lock className="w-3 h-3" />
              <span>Secure checkout powered by Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage