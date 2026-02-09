import React from 'react'

const TermsCondition = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-6 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-10">Terms of Service</h1>

        <div className="grid gap-10">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase">Section 01</span>
            <h2 className="text-xl font-bold mt-1">Acceptance of Terms</h2>
            <p className="text-slate-600 mt-2">By using our website, you confirm that you are at least 18 years old or accessing the site under parent/guardian supervision.</p>
          </div>

          <div>
            <span className="text-xs font-bold text-blue-600 uppercase">Section 02</span>
            <h2 className="text-xl font-bold mt-1">Pricing & Taxes</h2>
            <p className="text-slate-600 mt-2">All prices are inclusive of GST. We reserve the right to change prices without prior notice due to market fluctuations.</p>
          </div>

          <div>
            <span className="text-xs font-bold text-blue-600 uppercase">Section 03</span>
            <h2 className="text-xl font-bold mt-1">Governing Law</h2>
            <p className="text-slate-600 mt-2">These terms shall be governed by and construed in accordance with the laws of India. Any disputes will be subject to the courts of [Your Client's City/State].</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition