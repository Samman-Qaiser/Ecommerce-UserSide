import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export const WhatsAppButton = () => (
  <a
    href="https://wa.me/your-number"
    target="_blank"
    rel="noreferrer"
    className="fixed bottom-24 left-4 bg-green-500 p-2 rounded-md shadow-lg text-white hover:scale-110 transition-transform z-50"
  >
    <FaWhatsapp size={24} />
  </a>
);
