import React, { useState, useEffect } from "react";

function Home() {
  const [backendMessage,] = useState(""); // store backend data

  const fullText = "Welcome to DreamHotel ";
  const subText = "Experience luxury and comfort like never before.";
  const [typedText, setTypedText] = useState("");
  const [typedSubText, setTypedSubText] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  // ✅ Call backend when page loads
  

  // Fade-in animation on mount
  useEffect(() => {
    setFadeIn(false);
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Typing animation for main heading
  useEffect(() => {
    let current = 0;
    let typing = true;
    let timeout;
    function type() {
      if (typing) {
        setTypedText(fullText.slice(0, current + 1));
        current++;
        if (current <= fullText.length) {
          timeout = setTimeout(type, 200);
        } else {
          typing = false;
          timeout = setTimeout(() => {
            setTypedText("");
            current = 0;
            typing = true;
            type();
          }, 1200);
        }
      }
    }
    type();
    return () => clearTimeout(timeout);
  }, []);

  // Typing animation for subheading
  useEffect(() => {
    let current = 0;
    let typing = true;
    let timeout;
    function type() {
      if (typing) {
        setTypedSubText(subText.slice(0, current + 1));
        current++;
        if (current <= subText.length) {
          timeout = setTimeout(type, 100);
        } else {
          typing = false;
          timeout = setTimeout(() => {
            setTypedSubText("");
            current = 0;
            typing = true;
            type();
          }, 1000);
        }
      }
    }
    type();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={
        fadeIn ? "transition-opacity duration-1000 opacity-100" : "opacity-0"
      }
    >
      <div className="">
        <div className="relative w-full h-[100vh] flex items-center justify-center">
          <div className="cc"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <h2 className="text-4xl text-white font-bold text-center drop-shadow-lg">
              {typedText}
              <span className="border-r-2 border-white animate-pulse ml-1"></span>
            </h2>
            <p className="text-center mt-5 text-lg text-white drop-shadow-md">
              {typedSubText}
              <span className="border-r-2 border-white animate-pulse ml-1"></span>
            </p>

            {/* ✅ Show message from backend */}
            <p className="mt-4 text-yellow-300 font-semibold">
              {backendMessage}
            </p>

            <button
              className="mt-8 bg-gradient-to-r from-green-500 to-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-2xl hover:from-blue-600 hover:to-green-500 transition text-xl border-4 border-white"
              onClick={() => (window.location.href = "/booking")}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
