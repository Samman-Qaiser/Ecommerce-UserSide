// ThankYouPage.jsx
import React, { useState } from 'react';
import { CheckCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useSelector } from 'react-redux';
import AccountCreationForm from '../Auth/AccountCreationForm';

const ThankYouPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get user from Redux store
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    
    // Get order data from navigation state (passed from checkout)
    const orderData = location.state?.orderData || {
        orderId: 'ORD-' + Date.now(),
        customerName: 'Customer',
        customerEmail: 'customer@example.com'
    };

    const [showAuthDialog, setShowAuthDialog] = useState(false);

    const handleViewOrders = () => {
        if (isAuthenticated) {
            navigate('/orders');
        } else {
            setShowAuthDialog(true);
        }
    };

    const handleAuthSuccess = () => {
        setShowAuthDialog(false);
        navigate('/orders');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 py-8">
            <div className="max-w-xl w-full text-center bg-white shadow-lg rounded-2xl p-8 border border-slate-100">
                
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <CheckCircle className="text-green-500 w-20 h-20" />
                        <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900">
                    Order Placed Successfully! 
                </h1>

                <p className="text-slate-600 mb-6">
                    Thank you for shopping with us, {orderData.customerName}!
                </p>

                {/* Order Details Card */}
                <div className="bg-linear-to-br from-[#732D92]/5 to-purple-50 border border-[#732D92]/20 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                            Order Number
                        </span>
                        <Package className="w-5 h-5 text-[#732D92]" />
                    </div>
                    <p className="text-2xl font-bold text-[#732D92] mb-3">
                        #{orderData.orderId}
                    </p>
                    <p className="text-xs text-slate-500">
                        Confirmation sent to: <span className="font-medium">{orderData.customerEmail}</span>
                    </p>
                </div>

                {/* Benefits Section - Only show if NOT logged in */}
                {!isAuthenticated && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                        <p className="text-sm font-semibold text-amber-900 mb-2">
                            🎁 Create an account to unlock benefits!
                        </p>
                        <ul className="text-xs text-amber-800 text-left space-y-1">
                            <li>✓ Track your order in real-time</li>
                            <li>✓ View order history anytime</li>
                         
                        </ul>
                    </div>
                )}

                {/* Welcome Message - Only show if logged in */}
                {isAuthenticated && user && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <p className="text-sm font-semibold text-green-900">
                            Welcome back, {user.name}! 👋
                        </p>
                        <p className="text-xs text-green-700 mt-1">
                            You can track this order in your order history.
                        </p>
                    </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
                    <Button 
                        onClick={() => navigate('/allcategories')} 
                        variant="outline"
                        className="flex-1 h-11 border-slate-200 hover:bg-slate-50"
                    >
                        Continue Shopping
                    </Button>
                    
                    <Button
                        onClick={handleViewOrders}
                        className="flex-1 rounded-none h-11 text-white font-medium transition-all active:scale-[0.98]"
                    
                    >
                        {isAuthenticated ? 'View My Orders' : 'Create Account & Track Order'}
                    </Button>
                </div>

                <p className="text-xs text-slate-400">
                    Need help? Contact us at support@yourstore.com
                </p>
            </div>

            {/* Auth Dialog */}
            <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
                <DialogContent className="max-w-125 p-0 overflow-hidden">
                    <AccountCreationForm 
                        orderId={orderData.orderId}
                        orderData={orderData}
                        onSuccess={handleAuthSuccess}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ThankYouPage;