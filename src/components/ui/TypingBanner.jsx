import React, { useState, useEffect } from "react";

const messages = [
  "CASH ON DELIVERY AVAILABLE",
  "FREE SHIPPING ON ORDERS ABOVE 1000 INR",
];

const TypingBanner = () => {
  const [text, setText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = 100; // ms per character
    const pauseTime = 2000;  // ms pause after full message

    let timeout;

    if (charIndex < messages[messageIndex].length) {
      // Typing each character
      timeout = setTimeout(() => {
        setText((prev) => prev + messages[messageIndex][charIndex]);
        setCharIndex(charIndex + 1);
      }, typingSpeed);
    } else {
      // Wait & move to next message
      timeout = setTimeout(() => {
        setText("");
        setCharIndex(0);
        setMessageIndex((messageIndex + 1) % messages.length);
      }, pauseTime);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, messageIndex]);

  return (
    <div className="hidden lg:flex bg-[#732D92] items-center justify-center text-white p-2 ">
      {text}
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default TypingBanner;
