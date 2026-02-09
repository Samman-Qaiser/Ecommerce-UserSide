import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Shipping Policy</h1>
        <p className="text-slate-500 mb-10 italic">Last updated: February 2024</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-black mb-3">1. Order Processing</h2>
            <p>All orders are processed within 24-48 business hours. Orders are not shipped or delivered on Sundays or public holidays.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-3">2. Delivery Estimates</h2>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <ul className="space-y-2">
                <li className="flex justify-between"><span>Metros (Delhi, Mumbai, etc.)</span> <strong>2-4 Days</strong></li>
                <li className="flex justify-between"><span>Tier 2 & 3 Cities</span> <strong>5-7 Days</strong></li>
                <li className="flex justify-between"><span>North East & J&K</span> <strong>7-10 Days</strong></li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-3">3. Shipping Charges</h2>
            <p>We offer <strong>Free Shipping</strong> on all prepaid orders above ₹999. For Cash on Delivery (COD) orders, a flat convenience fee of ₹99 is applicable.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-3">4. Tracking</h2>
            <p>Once your order is dispatched, you will receive an SMS and Email with the tracking AWB number and the courier partner link (Delhivery, BlueDart, or XpressBees).</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;