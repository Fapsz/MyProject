import React, { useState, useEffect } from "react";

function Header() {
  const [showRoomsDropdown, setShowRoomsDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // reload or redirect
  };

  return (
    <header className="fixed top-0 w-full h-[70px] bg-gray-800 shadow-lg flex items-center justify-between px-6 z-50">
      {/* ✅ Logo */}
      <div className="flex items-center gap-3">
        <img
          src="/pexels-080.jpg"
          alt="Dream Hotel Logo"
          className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full shadow-md"
        />
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
          <span className="text-white">Dream</span>
          <span className="text-sky-400 ml-1">Hotel</span>
        </h1>
      </div>

      {/* ✅ Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 text-white font-semibold">
        <a href="/" className="hover:text-sky-300 text-sky-400">Home</a>
        <a href="/about" className="hover:text-sky-300">About</a>

        {/* Rooms Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-1 hover:text-sky-300"
            onClick={() => setShowRoomsDropdown((prev) => !prev)}
          >
            Rooms
            <svg
              className={`w-4 h-4 text-sky-400 transition-transform ${showRoomsDropdown ? "rotate-90" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {showRoomsDropdown && (
            <div className="absolute left-0 top-full mt-2 w-44 bg-white rounded-xl shadow-lg z-50">
              <ul className="text-left py-2 text-sky-700">
                <li><a href="/room?type=standard" className="block px-4 py-2 hover:bg-sky-100">Standard Room</a></li>
                <li><a href="/room?type=deluxe" className="block px-4 py-2 hover:bg-sky-100">Deluxe Room</a></li>
                <li><a href="/room?type=suite" className="block px-4 py-2 hover:bg-sky-100">Suite</a></li>
              </ul>
            </div>
          )}
        </div>

        <a href="/guest" className="hover:text-sky-300">Guest</a>
        <a href="/booking" className="hover:text-sky-300">Booking</a>
        <a href="/contact" className="hover:text-sky-300">Contact</a>
      </nav>

      {/* ✅ Profile / Signup / Login */}
      <div className="hidden md:flex items-center gap-3">
        {user ? (
          // ✅ If logged in, show profile
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-sky-700 px-4 py-2 rounded-full cursor-pointer">
              <img
                src={user.profileImage || "/default-avatar.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span>{user.fullname || "Profile"}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Logout
            </button>
          </div>
        ) : (
          // ✅ If not logged in, show signup/login
          <>
            <a href="/signup">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                Signup
              </button>
            </a>
            <a href="/login">
              <button className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full">
                Login
              </button>
            </a>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
