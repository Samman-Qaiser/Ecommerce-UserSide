import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-6 sm:px-12 lg:px-24 text-gray-500">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold text-black mb-2 uppercase tracking-tight">
          Returns & Exchange Policy
        </h1>
        <p className="text-gray-500 mb-10 italic border-l-4 border-[#A07B50] pl-4">
          Effective from: February 2026
        </p>

        <div className="space-y-12 leading-relaxed">
          
          {/* Return Policy Section */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 flex items-center">
              <span className="w-8 h-[2px] bg-[#A07B50] mr-3"></span>
              DOMESTIC RETURNS
            </h2>
            <div className="space-y-4">
              <ul className="list-disc pl-5 space-y-3">
                <li><strong className="text-black">Timeframe:</strong> Return requests must be raised within <span className="text-black font-semibold">10 days</span> of receiving the order.</li>
                <li><strong className="text-black">Condition:</strong> Products must be unused, unwashed, and in original packaging with <span className="text-[#A07B50]">tags intact</span>.</li>
                <li><strong className="text-black">Sale Items:</strong> Products bought during sales are non-refundable. However, they can be exchanged or a <span className="text-black">Store Credit</span> can be issued.</li>
                <li><strong className="text-black">Self-Shipping:</strong> If pickup is unavailable in your area, you may need to self-ship. We will provide a credit note of up to <span className="text-black">₹150</span> for reverse shipping.</li>
              </ul>
            </div>
          </section>

          {/* Exchange Policy Section */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 flex items-center">
              <span className="w-8 h-[2px] bg-[#A07B50] mr-3"></span>
              EXCHANGE POLICY
            </h2>
            <div className="space-y-4">
              <p>Exchange requests must be raised within 10 days. Please note:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Only <span className="text-black font-medium">one-time exchange</span> is available per order.</li>
                <li>If exchanging for a higher value item, the difference must be paid online (COD not available for exchanges).</li>
                <li>For lower value items, the difference will be issued as a <span className="text-[#A07B50]">Credit Note</span> valid for 1 year.</li>
              </ul>
            </div>
          </section>

          {/* Refund Policy Section */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 flex items-center">
              <span className="w-8 h-[2px] bg-[#A07B50] mr-3"></span>
              REFUND PROCESS
            </h2>
            <div className="space-y-4">
              <p>Refunds are processed after the product passes our quality check.</p>
              <div className="bg-gray-50 p-5 border-l-2 border-[#A07B50]">
                <p className="text-sm font-medium text-black">Timeline: 2-3 working days after pickup.</p>
                <p className="text-sm mt-2">
                  <strong className="text-black">Damaged Products:</strong> Must be reported within <span className="text-black">48 hours</span> of delivery with photos/videos sent to <span className="text-[#A07B50]">returns@dototaagabykriti.com</span>.
                </p>
              </div>
            </div>
          </section>

          {/* International Policy Section */}
          <section className="bg-black text-white p-8 rounded-sm">
            <h2 className="text-xl font-bold mb-4 text-[#A07B50]">INTERNATIONAL ORDERS</h2>
            <p className="text-gray-300 text-sm mb-4">
              Currently, we do not offer returns or exchanges for international orders. 
            </p>
            <ul className="text-xs space-y-2 text-gray-400">
              <li>• Cancellations are only possible before the order is shipped.</li>
              <li>• For defective products, contact us immediately with your Order ID for a refund/credit note investigation.</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;