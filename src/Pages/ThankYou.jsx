import React from 'react'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const ThankYou = ({ orderNumber = '123456', customerName = 'Customer' }) => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-xl w-full text-center bg-white shadow-lg rounded-xl p-8">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
          Thank You, {customerName}!
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground mb-6">
          Your order has been placed successfully.
        </p>

        {/* Order Details */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-green-700">Order Number:</p>
          <p className="text-lg font-semibold text-green-900">{orderNumber}</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={() => navigate('/shop')} className="flex-1">
            Continue Shopping
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/orders')}
            className="flex-1"
          >
            View Order
          </Button>
        </div>

        {/* Optional: Social Share / Rewards */}
        <p className="mt-6 text-xs text-muted-foreground">
          We appreciate your purchase! You can track your order in "My Orders".
        </p>
      </div>
    </div>
  )
}

export default ThankYou
