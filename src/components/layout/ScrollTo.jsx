import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const ScrollTo = () => {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Top button show if scrolled more than 100px
      setShowTop(scrollTop > 100);

      // Bottom button show if not at bottom
      setShowBottom(scrollTop + windowHeight < fullHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });

  return (
    <div className="fixed bottom-24 right-6 flex flex-col gap-3 z-9999">
      {showTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 bg-gray-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-all"
          title="Scroll to Top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
      {showBottom && (
        <button
          onClick={scrollToBottom}
          className="w-11 h-11 bg-gray-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-all"
          title="Scroll to Bottom"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ScrollTo;
