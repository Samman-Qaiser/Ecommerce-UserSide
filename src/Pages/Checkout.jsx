import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../redux/cartSlice";
import { Trash2, Minus, Plus, CreditCard, Truck, Lock, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const CheckoutPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items);

  // ============================================
  // PAYMENT CALCULATION LOGIC
  // ============================================
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  
  // COD Shipping: ₹99
  const codShippingFee = 99
  
  // COD Advance Payment: ₹500 (via Stripe)
  const codAdvancePayment = 500
  
  let stripeAmount = 0
  let codAmount = 0
  let shippingFee = 0
  let totalAmount = 0

  if (paymentMethod === 'cod') {
    // COD: Pay ₹500 advance via Stripe + Remaining on delivery
    shippingFee = codShippingFee
    totalAmount = subtotal + shippingFee
    stripeAmount = codAdvancePayment
    codAmount = totalAmount - codAdvancePayment
    
  } else if (paymentMethod === 'prepaid') {
    // Prepaid: Full payment via Stripe (Free shipping)
    shippingFee = 0
    totalAmount = subtotal + shippingFee
    stripeAmount = totalAmount
    codAmount = 0
  }

  const onSubmit = (data) => {
    const orderData = {
      ...data,
      paymentMethod,
      subtotal,
      shippingFee,
      totalAmount,
      stripeAmount,
      codAmount,
    }
    
    console.log('Checkout Data:', orderData)
    
    if (paymentMethod === 'cod') {
      alert(`Order Placed!\n\nAdvance Payment (Stripe): ₹${stripeAmount}\nCOD Amount: ₹${codAmount}\nTotal: ₹${totalAmount}`)
      // Redirect to Stripe payment for ₹500
      // handleStripePayment(stripeAmount)
      dispatch(clearCart())
            navigate('/thankyou')

    } else {
      alert(`Order Placed!\n\nTotal Payment (Stripe): ₹${stripeAmount}`)
      // Redirect to Stripe payment for full amount
      // handleStripePayment(stripeAmount)
            navigate('/thankyou')
                  dispatch(clearCart())

    }
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-12 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Checkout Form */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Checkout</h2>
            <p className="text-slate-500 mt-2">Please enter your details below to complete your purchase.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Shipping Details Section */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
              <h3 className="text-lg font-semibold border-b pb-3">Shipping Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-xs uppercase tracking-wider font-bold text-slate-500">Full Name</Label>
                  <Input id="fullName" placeholder="John Doe" className="bg-slate-50 border-none focus-visible:ring-1" {...register('fullName', { required: 'Full Name is required' })} />
                  {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-wider font-bold text-slate-500">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="bg-slate-50 border-none focus-visible:ring-1" {...register('email', { required: 'Email is required' })} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-xs uppercase tracking-wider font-bold text-slate-500">Street Address</Label>
                <Input id="address" placeholder="123 Luxury Lane" className="bg-slate-50 border-none focus-visible:ring-1" {...register('address', { required: 'Address is required' })} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-xs uppercase tracking-wider font-bold text-slate-500">City</Label>
                  <Input id="city" placeholder="Mumbai" className="bg-slate-50 border-none focus-visible:ring-1" {...register('city', { required: 'City is required' })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-xs uppercase tracking-wider font-bold text-slate-500">State</Label>
                  <Input id="state" placeholder="MH" className="bg-slate-50 border-none focus-visible:ring-1" {...register('state', { required: 'State is required' })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip" className="text-xs uppercase tracking-wider font-bold text-slate-500">ZIP Code</Label>
                  <Input id="zip" placeholder="400001" className="bg-slate-50 border-none focus-visible:ring-1" {...register('zip', { required: 'ZIP is required' })} />
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
              <h3 className="text-lg font-semibold border-b pb-3">Payment Method</h3>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="grid grid-cols-2 gap-4"
              >
                {/* COD Option */}
                <Label
                  htmlFor="cod"
                  className={`flex flex-col p-2 border rounded-md cursor-pointer transition-all ${
                    paymentMethod === 'cod' 
                      ? 'border-black bg-slate-50 ring-2 ring-black ring-offset-1' 
                      : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="cod" id="cod" />
                      <Truck className="w-6 h-6 text-slate-400" />
                      <div>
                        <p className="font-bold text-base">Cash on Delivery (COD)</p>
                        <p className="text-xs text-slate-500 mt-0.5">Pay ₹500 now + Remaining on delivery</p>
                      </div>
                    </div>
            
                  </div>
                </Label>

                {/* Prepaid Option */}
                <Label
                  htmlFor="prepaid"
                  className={`flex flex-col p-2 border rounded-md cursor-pointer transition-all ${
                    paymentMethod === 'prepaid' 
                      ? 'border-black bg-slate-50 ring-2 ring-black ring-offset-2' 
                      : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="prepaid" id="prepaid" />
                        <CreditCard className="w-6 h-6 text-slate-400" />
                      <div>
                        <p className="font-bold text-base">Prepaid (Online Payment) </p>
                        <p className="text-xs text-green-600 font-medium mt-0.5">✓ Free Shipping</p>
                      </div>
                    </div>
                  
                  </div>
                  
          
                </Label>
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full py-7 text-lg font-bold bg-black hover:bg-slate-800 transition-all rounded-xl shadow-lg shadow-slate-200">
              {paymentMethod === 'cod' 
                ? `Pay ₹${stripeAmount} Now (Advance)` 
                : `Pay ₹${stripeAmount.toLocaleString()} (Full Payment)`
              }
            </Button>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl sticky top-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="max-h-100 overflow-y-auto pr-2 space-y-6 mb-6 custom-scrollbar">
              {cartItems.length === 0 ? (
                <p className="text-slate-400 text-center py-10">Your cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-24 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-50">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{item.name}</h3>
                          <button onClick={() => dispatch(removeFromCart(item.id))} className="text-slate-300 hover:text-red-500 transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{item.category || "Standard Edition"}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-slate-50 rounded-lg p-1 border">
                          <button onClick={() => dispatch(decreaseQty(item.id))} className="p-1 hover:bg-white rounded-md transition shadow-sm"><Minus className="w-3 h-3"/></button>
                          <span className="px-3 text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => dispatch(increaseQty(item.id))} className="p-1 hover:bg-white rounded-md transition shadow-sm"><Plus className="w-3 h-3"/></button>
                        </div>
                        <span className="font-bold text-sm">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Shipping</span>
                <span className={shippingFee === 0 ? "text-green-600 font-medium" : ""}>
                  {shippingFee === 0 ? 'Free' : `₹${shippingFee}`}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold">Total Amount</span>
                <span className="text-2xl font-black tracking-tight text-black">₹{totalAmount.toLocaleString()}</span>
              </div>

              {/* Payment Breakdown */}
              {paymentMethod === 'cod' ? (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-xs font-bold text-blue-900 mb-2">Payment Breakdown:</p>
                  <div className="space-y-1.5 text-xs text-blue-800">
                    <div className="flex justify-between">
                      <span>Stripe (Now):</span>
                      <span className="font-bold">₹{stripeAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>COD (On Delivery):</span>
                      <span className="font-bold">₹{codAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-xs font-bold text-green-900 mb-2">Payment Details:</p>
                  <div className="space-y-1.5 text-xs text-green-800">
                    <div className="flex justify-between">
                      <span>Stripe Payment:</span>
                      <span className="font-bold">₹{stripeAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <span className="text-lg">✓</span>
                      <span className="font-medium">Free Shipping Included</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Lock className="w-4 h-4" />
                  <span>Secure checkout • SSL encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage