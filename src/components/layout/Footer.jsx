import {Link} from 'react-router-dom'
import { 
  FaFacebookF, 
  FaInstagram, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaPinterest
} from "react-icons/fa";

export const Footer = () => {
  const helpLinks = [
    { name: "Privacy Policy", link: "/privacypolicy" },
    { name: "Shipping Policy", link: "/shippingpolicy" },
    { name: "Cancellation & Return", link: "returnpolicy" },
    { name: "Terms & Conditions", link: "/termscondition" },
  ];

  const companyLinks = [
    { name: "Our Stores", link: "/" },
    { name: "About Us", link: "/aboutus" },
    { name: "Contact Us", link: "/contactus" },

  ];

const paymentMethods = [
  { name: "Visa", img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" },
  { name: "Mastercard", img: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
  { name: "Stripe", img: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" }, // Secure feel
  { name: "UPI", img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" },
];
const socials = [
  { icon: FaFacebookF, url: "https://www.facebook.com/doritaaga" },
  { icon: FaInstagram, url: "https://www.instagram.com/doritaaga" },
  { icon: FaPinterest, url: "https://www.pinterest.com/doritaaga/" },
];
  return (
    <footer className="bg-primary text-[#FDF8F1] pt-16 pb-8 px-6 lg:px-20 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        {/* Column 1: Brand & Socials */}
        <div className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="space-y-2 ">
            <img src='./logo-trans.png' className="w-30 h-24 m-auto lg:m-0"/>
            <p className="text-sm font-light leading-relaxed max-w-62.5">
              Discover timeless elegance and contemporary style at Doritaga.
            </p>
          </div>
          
         <div className="flex gap-3">
  {socials.map(({ icon: Icon, url }, idx) => (
    <a
      key={idx}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-[#FDF8F1]/80 transition-colors shadow-lg"
    >
      <Icon size={18} />
    </a>
  ))}
</div>
        </div>

        {/* Column 2: Help & Company (Combined for Mobile) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <h4 className="text-lg font-medium tracking-widest uppercase border-b border-[#FDF8F1]/20 pb-2">HELP</h4>
            <ul className="space-y-3 text-sm font-light opacity-80">
              {helpLinks.map((link, i) => (
                <li key={i} className="hover:opacity-100 transition-opacity"><Link to={link.link}>{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-medium tracking-widest uppercase border-b border-[#FDF8F1]/20 pb-2">COMPANY</h4>
            <ul className="space-y-3 text-sm font-light opacity-80">
              {companyLinks.map((link, i) => (
                <li key={i} className="hover:opacity-100 transition-opacity"><a href={link.link}>{link.name}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 3: Contact */}
        <div className="space-y-6">
          <h4 className="text-lg font-medium tracking-widest uppercase border-b border-[#FDF8F1]/20 pb-2">CONTACT</h4>
          <div className="space-y-4 text-sm font-light opacity-80">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 shrink-0" />
              <p> SECTOR-22A, GURGAON, Gurgaon,
Haryana, 122015</p>
            </div>
            <div className="flex items-center gap-3 border-t border-[#FDF8F1]/10 pt-4">
              <FaPhoneAlt className="shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase opacity-60 tracking-widest">International</span>
                <a href="tel:+123456789" className="hover:underline">+123456789</a>
              </div>
            </div>
          </div>
        </div>

        {/* Column 4: Payments */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium tracking-widest uppercase border-b border-[#FDF8F1]/20 pb-2">PAYMENTS</h4>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((pay, i) => (
              <div key={i} className="bg-[#FDF8F1] p-2 rounded-md flex items-center justify-center h-12 shadow-inner">
                <img src={pay.img} alt={pay.name} className="h-6 w-20 object-contain grayscale hover:grayscale-0 transition-all cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="mt-16 pt-8 border-t border-[#FDF8F1]/10 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase opacity-60">
          @2026 Doritaga . ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};