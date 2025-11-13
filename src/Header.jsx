import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [showRoomsDropdown, setShowRoomsDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ Track login
  const [userName, setUserName] = useState(""); // optional display name
  const navigate = useNavigate();

  // ✅ Check login on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setUserName(user.fullname || "Guest");
    }

    // ✅ Listen for storage changes (from other tabs/windows)
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      if (updatedUser) {
        setIsLoggedIn(true);
        setUserName(updatedUser.fullname || "Guest");
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 w-full h-[70px] bg-gray-800 shadow-lg flex items-center justify-between px-6 z-50">
      {/* ✅ Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/pexels-080.jpg"
          alt="Dream Hotel Logo"
          className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full shadow-md"
        />
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
          <span className="text-white">Dream</span>
          <span className="text-sky-400 ml-1">Hotel</span>
          <span className="text-sky-400 ml-1">.</span>
        </h1>
      </div>

      {/* ✅ Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 text-white font-semibold">
        <a href="/" className="hover:text-sky-300 text-sky-400">
          Home
        </a>
        <a href="/about" className="hover:text-sky-300">
          About
        </a>

        {/* Rooms Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-1 hover:text-sky-300"
            onClick={() => setShowRoomsDropdown((prev) => !prev)}
          >
            Rooms
            <svg
              className={`w-4 h-4 text-sky-400 transition-transform ${
                showRoomsDropdown ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          {showRoomsDropdown && (
            <div className="absolute left-0 top-full mt-2 w-44 bg-white rounded-xl shadow-lg z-50">
              <ul className="text-left py-2 text-sky-700">
                <li>
                  <a
                    href="/room?type=standard"
                    className="block px-4 py-2 hover:bg-sky-100"
                  >
                    Standard Room
                  </a>
                </li>
                <li>
                  <a
                    href="/room?type=deluxe"
                    className="block px-4 py-2 hover:bg-sky-100"
                  >
                    Deluxe Room
                  </a>
                </li>
                <li>
                  <a
                    href="/room?type=suite"
                    className="block px-4 py-2 hover:bg-sky-100"
                  >
                    Suite
                  </a>
                </li>
                <li>
                  <a
                    href="/room?type=family"
                    className="block px-4 py-2 hover:bg-sky-100"
                  >
                    Family Room
                  </a>
                </li>
                <li>
                  <a
                    href="/room?type=executive"
                    className="block px-4 py-2 hover:bg-sky-100"
                  >
                    Executive Room
                  </a>
                </li>
                <li>
                  <a
                    href="/room?type=presidential"
                    className="block px-4 py-2 hover:bg-sky-100"
                  >
                    Presidential Suite
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <a href="/guest" className="hover:text-sky-300">
          Guest
        </a>
        <a href="/booking" className="hover:text-sky-300">
          Booking
        </a>
        <a href="/contact" className="hover:text-sky-300">
          Contact
        </a>
      </nav>

      {/* ✅ Right side buttons */}
      <div className="hidden md:flex items-center gap-3">
        {!isLoggedIn ? (
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
        ) : (
          // ✅ Profile Menu
          <div className="relative group">
            <button className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 py-2 px-4 rounded-full text-white font-semibold">
              <img
                src="/default-avatar.png"
                alt="User Avatar"
                className="w-6 h-6 rounded-full"
              />
              {userName.split(" ")[0]}
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg text-gray-800 hidden group-hover:block">
              <ul className="py-2 text-sm">
                <li>
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left px-4 py-2 hover:bg-sky-100"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-500"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Mobile Hamburger */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      >
        {isMobileMenuOpen ? (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* ✅ Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-gray-900 flex flex-col items-center py-6 gap-6 text-white font-semibold md:hidden">
          <a href="/" className="hover:text-sky-300">
            Home
          </a>
          <a href="/about" className="hover:text-sky-300">
            About
          </a>
          <a href="/room" className="hover:text-sky-300">
            Rooms
          </a>
          <a href="/guest" className="hover:text-sky-300">
            Guest
          </a>
          <a href="/booking" className="hover:text-sky-300">
            Booking
          </a>
          <a href="/contact" className="hover:text-sky-300">
            Contact
          </a>

          {!isLoggedIn ? (
            <div className="flex gap-3 mt-4">
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
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 mt-4">
              <button
                onClick={() => navigate("/profile")}
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-full"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
