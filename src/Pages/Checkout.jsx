import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const CheckoutPage = ({ cartItems = [] }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [paymentMethod, setPaymentMethod] = useState('cod') // default COD

  const onSubmit = (data) => {
    console.log('Checkout Data:', { ...data, paymentMethod })
    alert('Order Placed Successfully!')
    // Redirect to Thank You page or process payment
  }

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* -------------------- Billing / Shipping Form -------------------- */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Checkout</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* -------------------- Personal Info -------------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  {...register('fullName', { required: 'Full Name is required' })}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                  })}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>

            {/* -------------------- Address Info -------------------- */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="123 Main St"
                  {...register('address', { required: 'Address is required' })}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    {...register('city', { required: 'City is required' })}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="NY"
                    {...register('state', { required: 'State is required' })}
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                </div>
                <div>
                  <Label htmlFor="zip">ZIP</Label>
                  <Input
                    id="zip"
                    placeholder="10001"
                    {...register('zip', { required: 'ZIP is required' })}
                  />
                  {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip.message}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="USA"
                  {...register('country', { required: 'Country is required' })}
                />
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
              </div>
            </div>

            <Separator className="my-6" />

            {/* -------------------- Payment Method -------------------- */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Payment Method</h3>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-3"
              >
                <div className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="cod" />
                    <span className="text-gray-900 font-medium">Cash on Delivery</span>
                  </div>
                  <span className="text-gray-500 text-sm">Pay when you receive your order</span>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="stripe" />
                    <span className="text-gray-900 font-medium">Stripe / Card Payment</span>
                  </div>
                  <span className="text-gray-500 text-sm">Secure online payment</span>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full mt-6 py-4 text-lg font-semibold">
              Place Order
            </Button>
          </form>
        </div>

        {/* -------------------- Order Summary Panel -------------------- */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <p className="text-gray-800 font-medium">{item.name} x {item.quantity}</p>
                  <p className="text-gray-900 font-semibold">${item.price * item.quantity}</p>
                </div>
              ))
            )}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <p>Total</p>
            <p>${totalAmount}</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CheckoutPage
