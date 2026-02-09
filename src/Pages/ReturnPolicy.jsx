import React from 'react'

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Returns & Refunds</h1>
        <p className="text-slate-500 mb-10 italic">Hassle-free 7-day return policy</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section className="border-l-4 border-black pl-4">
            <p className="font-medium text-black">We offer a 7-day return/replacement window from the date of delivery. Items must be in original condition with all tags.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-3">How to Initiate a Return?</h2>
            <p>You can raise a request via our "Support" section or email us at <strong>support@yourbrand.com</strong> with your Order ID and 2 photos of the product.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-3">Refund Method</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Prepaid Orders:</strong> Refund will be credited back to the original payment method (3-5 days).</li>
              <li><strong>COD Orders:</strong> We will provide a secure link to collect your bank details or UPI ID for the refund.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy