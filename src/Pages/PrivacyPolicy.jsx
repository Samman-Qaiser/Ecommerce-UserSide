import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-black mb-2 uppercase tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-gray-500 mb-10 italic border-l-4 border-[#A07B50] pl-4 font-medium">
          Your privacy is our priority.
        </p>

        <div className="space-y-10 text-gray-500 leading-relaxed text-sm md:text-base">
          
          <section>
            <p>
              At <span className="text-black font-semibold">Dototaaga by Kriti</span>, we are committed to protecting your personal information. This policy describes how we collect, use, and protect the data you share with us while using our website.
            </p>
          </section>

          {/* Who We Are */}
          <section className="bg-gray-50 p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-black mb-3 uppercase tracking-wide">1. Who We Are</h2>
            <p>
              Dototaaga by Kriti is an e-commerce platform engaged in the retailing and styling of high-quality apparel. 
              Our operations are conducted through our official website and authorized channels.
            </p>
          </section>

          {/* Collection of Data */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 flex items-center">
              <span className="w-8 h-[2px] bg-[#A07B50] mr-3"></span>
              2. COLLECTION OF DATA
            </h2>
            <div className="space-y-4">
              <p>We collect information to provide better services to our users, including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-black">Identity & Contact:</strong> Name, email ID, phone number, and shipping address provided during sign-up or checkout.</li>
                <li><strong className="text-black">Transaction Details:</strong> Information about your orders, payment instrument details (processed via secure third-party gateways), and billing address.</li>
                <li><strong className="text-black">Technical Data:</strong> IP address, browser type, and shopping behavior to improve your experience.</li>
              </ul>
            </div>
          </section>

          {/* Use of Data */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 flex items-center">
              <span className="w-8 h-[2px] bg-[#A07B50] mr-3"></span>
              3. HOW WE USE YOUR DATA
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border p-4 rounded-sm border-gray-100">
                <h4 className="font-bold text-black mb-1">Order Fulfillment</h4>
                <p className="text-xs">To process payments, handle deliveries, and provide customer support.</p>
              </div>
              <div className="border p-4 rounded-sm border-gray-100">
                <h4 className="font-bold text-black mb-1">Personalization</h4>
                <p className="text-xs">To recommend products and display interest-based ads tailored for you.</p>
              </div>
              <div className="border p-4 rounded-sm border-gray-100">
                <h4 className="font-bold text-black mb-1">Communication</h4>
                <p className="text-xs">To send order updates, promotional offers, and service notifications.</p>
              </div>
              <div className="border p-4 rounded-sm border-gray-100">
                <h4 className="font-bold text-black mb-1">Security</h4>
                <p className="text-xs">To analyze performance, fix errors, and prevent potential fraud.</p>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-bold text-black mb-3">4. Cookies</h2>
            <p>
              We use "Cookies" to analyze web page flow and promote safety. Cookies help us remember your preferences 
              and tailor our operations to your likes and dislikes. You can choose to decline cookies through your browser settings, 
              though this may limit some website features.
            </p>
          </section>

          {/* Data Security */}
          <section className="border-t border-gray-100 pt-8">
            <h2 className="text-xl font-bold text-black mb-3">5. Data Security & Retention</h2>
            <p className="mb-4">
              We take reasonable steps to ensure appropriate safeguards are in place to protect your personal information 
              from unauthorized access or alteration. We retain your data only as long as necessary for legal or regulatory reasons.
            </p>
            <div className="bg-black text-white p-6 rounded-sm">
              <p className="text-xs uppercase tracking-widest text-[#A07B50] mb-2 font-bold">Security Alert</p>
              <p className="text-sm">
                Dototaaga by Kriti will <span className="underline decoration-[#A07B50]">never</span> ask for your 
                Net-banking password, Credit/Debit card PIN, or OTP via call or email. Please do not share these details with anyone.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold text-black mb-3">6. Controlling Your Info</h2>
            <p>
              You can opt-out of promotional communications at any time. If you wish to correct your information or have any queries, 
              reach out to us at: <span className="text-[#A07B50] font-bold">doritaagakirti1@gmail.com</span>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;