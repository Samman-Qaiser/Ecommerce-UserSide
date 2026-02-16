import React from 'react';

const TermsCondition = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold text-black mb-2 uppercase tracking-tighter">
          Terms & Conditions
        </h1>
        <p className="text-gray-500 mb-12 italic border-l-4 border-[#A07B50] pl-4 font-medium">
          Please read these terms carefully before using our services.
        </p>

        <div className="space-y-12 text-gray-500 leading-relaxed text-sm md:text-base">
          
          {/* Welcome Section */}
          <section>
            <p>
              Welcome to <span className="text-black font-semibold">Dototaaga by Kriti</span>. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern our relationship with you.
            </p>
            <p className="mt-4">
              The term <span className="text-[#A07B50] font-bold">'Dototaaga by Kriti'</span> or 'us' or 'we' refers to the owner of the website. The term 'you' refers to the user or viewer of our website.
            </p>
          </section>

          {/* Usage Terms */}
          <section className="grid gap-8">
            <div className="border-t border-gray-100 pt-6">
              <span className="text-[10px] font-bold text-[#A07B50] uppercase tracking-[0.2em]">Usage 01</span>
              <h2 className="text-lg font-bold text-black mt-1 uppercase">General Information</h2>
              <p className="mt-2">The content of the pages of this website is for your general information and use only. It is subject to change without notice.</p>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <span className="text-[10px] font-bold text-[#A07B50] uppercase tracking-[0.2em]">Usage 02</span>
              <h2 className="text-lg font-bold text-black mt-1 uppercase">Liability & Risk</h2>
              <p className="mt-2">Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products or services meet your specific requirements.</p>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <span className="text-[10px] font-bold text-[#A07B50] uppercase tracking-[0.2em]">Usage 03</span>
              <h2 className="text-lg font-bold text-black mt-1 uppercase">Intellectual Property</h2>
              <p className="mt-2">This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited.</p>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <span className="text-[10px] font-bold text-[#A07B50] uppercase tracking-[0.2em]">Usage 04</span>
              <h2 className="text-lg font-bold text-black mt-1 uppercase">External Links</h2>
              <p className="mt-2">From time to time, this website may include links to other websites. These links are provided for your convenience. They do not signify that we endorse the website(s).</p>
            </div>
          </section>

          {/* Governing Law Box */}
          <section className="bg-black text-white p-8 rounded-sm mt-10">
            <h2 className="text-xl font-bold mb-4 text-[#A07B50]">GOVERNING LAW</h2>
            <p className="text-gray-300 text-sm">
              Your use of this website and any dispute arising out of such use is subject to the laws of India or other regulatory authority. Any unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
            </p>
          </section>

          {/* Contact Footer */}
          <footer className="pt-10 text-center">
            <p className="text-xs uppercase tracking-widest">Questions about Terms?</p>
            <p className="text-[#A07B50] font-bold text-lg">doritaagakirti1@gmail.com</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;