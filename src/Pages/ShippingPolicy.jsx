import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold text-black mb-2 uppercase tracking-tight">
          Shipping & Delivery Policy
        </h1>
        <p className="text-gray-500 mb-10 italic border-l-4 border-[#A07B50] pl-4">
          Last updated: February 2026
        </p>

        <div className="space-y-10 text-gray-500 leading-relaxed">
          
          {/* Domestic Shipping */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 flex items-center">
              <span className="w-8 h-[2px] bg-[#A07B50] mr-3"></span>
              DOMESTIC SHIPPING (INDIA)
            </h2>
            <div className="space-y-4">
              <p>
                At <span className="text-[#A07B50] font-semibold">Dototaaga by Kriti</span>, we strive to deliver your orders as quickly as possible.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-black">Prepaid Orders:</strong> We offer <span className="text-[#A07B50]">Free Shipping</span> on all prepaid orders.</li>
                <li><strong className="text-black">COD Orders:</strong> A flat convenience fee of <span className="text-black">₹300</span> is applicable for Cash on Delivery.</li>
                <li><strong className="text-black">Standard Delivery:</strong> Domestic orders are typically delivered within <span className="text-black">3 to 5 working days</span>.</li>
                <li><strong className="text-black">Pre-Orders:</strong> For items on Pre-Order, delivery takes <span className="text-[#A07B50]">15 to 30 days</span> (Full Prepaid only).</li>
              </ul>
            </div>
          </section>

          {/* International Shipping */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 flex items-center">
              <span className="w-8 h-[2px] bg-[#A07B50] mr-3"></span>
              INTERNATIONAL SHIPPING
            </h2>
            <div className="space-y-4">
              <p>
                Shipping charges for international customers are calculated during checkout based on the order value and dimensions.
              </p>
              <div className="bg-gray-50 p-5 rounded-sm border-l-2 border-gray-200">
                <p className="text-sm">
                  <strong className="text-black">Note:</strong> Any custom charges or VAT must be borne by the customer. 
                  Orders are delivered within <span className="text-black">7-8 working days</span> via our delivery partners (DHL).
                </p>
              </div>
            </div>
          </section>

          {/* Address Modifications */}
          <section>
            <h2 className="text-xl font-bold text-black mb-3">Order Modifications</h2>
            <p>
              Delivery will be made to the address mentioned at the time of placing the order. For any modifications, 
              kindly email us at <span className="text-[#A07B50] font-medium">doritaagakirti1@gmail.com</span> within <span className="text-black">2 hours</span> of placing your order.
            </p>
          </section>

          {/* Return to Origin (RTO) */}
          <section className="border-t border-gray-100 pt-8">
            <h2 className="text-xl font-bold text-black mb-3">Important Notice</h2>
            <p className="text-sm">
              In case an international order is returned (RTO), customs charges and shipping fees will be deducted from the refund amount. 
              The refund will only be issued for the product cost.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;