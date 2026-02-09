import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm rounded-2xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 border-b pb-4">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none space-y-6">
          <p>This policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our store.</p>
          
          <h3 className="text-lg font-bold">Information We Collect</h3>
          <p>When you make a purchase, we collect information including your name, billing address, shipping address, payment information, email address, and phone number.</p>

          <h3 className="text-lg font-bold">Why We Need It</h3>
          <p>We use this information to fulfill orders, communicate with you, screen for potential risk/fraud, and provide you with information or advertising relating to our products.</p>

          <h3 className="text-lg font-bold">Data Security</h3>
          <p>We use industry-standard encryption to protect your data. Your payment information is processed through secure gateways like Stripe and is never stored on our servers.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy