import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const AnimatedButton = ({ 
  to, 
  label = "Explore More", 
  className = "", 
  showIcon = true,
  icon: CustomIcon,
  onClick,
  align = "responsive" // Default ab "responsive" rakha
}) => {

  // Alignment logic with responsive support
  const alignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    responsive: "text-center lg:text-left" // Mobile: center, lg: left
  }[align];

  const ButtonContent = (
    <button 
      type="button"
      onClick={onClick} 
      className={`group relative mt-7 overflow-hidden px-10 py-4 bg-white border border-black font-bold text-black transition-all duration-500 ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-500 uppercase tracking-widest text-sm leading-relaxed">
        {label}
        {showIcon && (
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            {CustomIcon ? <CustomIcon className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </span>
        )}
      </span>
      <div className="absolute inset-0 bg-black translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
    </button>
  );

  return (
    <div className={`${alignmentClass} w-full`}>
      {to ? (
        <Link to={to} className="inline-block">{ButtonContent}</Link>
      ) : (
        ButtonContent
      )}
    </div>
  );
};

export default AnimatedButton;
