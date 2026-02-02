import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  // Arrays for the footer links
  const customerServiceLinks = [
    "Track Order",
    "Locate Our Store",
    "Terms & Conditions",
    "Shipping & Delivery Policy",
    "Privacy Policy",
    "Disclaimer Policy",
    "Return & Exchange Policy",
  ];

  const quickLinks = [
    "Return & Exchange Request",
    "Contact Us!",
    "FAQ",
    "We Are Hiring!",
    "Terms of Use",
    "Wholesale Enquiries",
    "About Us",
  ];

  // Array for social icons
  const socialIcons = [
    { icon: <FaFacebookF />, name: "Facebook" },
    { icon: <FaTwitter />, name: "Twitter" },
    { icon: <FaYoutube />, name: "YouTube" },
    { icon: <FaLinkedinIn />, name: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#292929] text-gray-300 relative">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div className="space-y-2">
          <h4 className="font-semibold text-white text-left">Customer Service</h4>
          <ul className="space-y-1 text-left text-sm">
            {customerServiceLinks.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
        </div>

        {/* Column 2 */}
        <div className="space-y-2">
          <h4 className="font-semibold text-white text-left">Quick Links</h4>
          <ul className="space-y-1 text-left text-sm">
            {quickLinks.map((link, index) => (
              <li
                key={index}
                className={link === "We Are Hiring!" ? "text-red-500" : ""}
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}
        <div className="space-y-2">
          <h4 className="font-semibold text-white text-left">Newsletter</h4>
          <p className="text-sm text-left">Sign up to receive exclusive offers</p>
          <div className="flex flex-col items-start" >
            <Input placeholder="E-mail"  className=' block w-full rounded-none'/>
            <br />
            <Button className='rounded-none px-7 py-3 bg-white text-black'>Subscribe</Button>
          </div>
        </div>

        {/* Column 4 */}
        <div className="space-y-2">
          <h4 className="font-semibold text-white text-left">About</h4>
          <p className="text-sm text-left">
            Suta combines India’s centuries-old weaving traditions with
            contemporary style—so that what looks good, feels good too.
          </p>
          <p className="text-sm mt-2 text-left">
            Toll Free: <a href="tel:08045680200 " className="underline">080-456-80200</a>
          </p>
          <p className="text-sm text-left">
            Email: <a href="mailto:info@suta.in" className="underline">info@suta.in</a>
          </p>
        </div>
      </div>

      {/* Social & Copyright */}
      <div className=" mt-6 py-4 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-6">
        <div className="flex w-full  text-center  items-center justify-center gap-16">
          {socialIcons.map((social, index) => (
            <span key={index} title={social.name} className="size-10">
              {social.icon}
            </span>
          ))}
        </div>
      
      </div>
        <p className="text-sm tracking-widest text-center  sm:mt-0">
          © 2026 SUTA PRIVATE LIMITED. All Rights Reserved. 
        </p>
    </footer>
  );
};
