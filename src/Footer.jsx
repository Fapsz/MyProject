import { FaFacebookF, FaInstagram, FaGoogle } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 ">
        {/* Brand / About */}
        <div className="aa">
          <h1 className="text-3xl md:text-2xl font-bold ">
        <span className="text-gray-200">Dream</span>
        <span className="text-sky-400 ml-1">Hotel</span>
        <span className="text-sky-400 ml-1">.</span>
      </h1>
          <p className="text-sm leading-6">
            Experience comfort and luxury like never before. DreamHotel offers
            world-class hospitality tailored to your needs.
          </p>
        </div>

        {/* Quick Links */}
        <div className="aa">
          <h3 className="text-lg font-semibold text-sky-400 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", link: "/"},
              { name: "About", link: "/about" },
              { name: "Room", link: "/room" },
              { name: "Guest", link: "/guest" },
              { name: "Booking", link: "/booking" },
              { name: " Contact", link: "/contact"}
            ].map((item, i) => (
              <li key={i}>
                <a
                  href={item.link}
                  className="hover:text-sky-300  transition-colors duration-300 ease-in-out"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Support */}
        <div className="aa">
          <h3 className="text-lg font-semibold text-sky-400 mb-3">
            Customer Support
          </h3>
          <ul className="space-y-2 text-sm">
            {["FAQs", "Hotel Policies", "Support", "Booking"].map((item, i) => (
              <li key={i}>
                <a
                  href="/"
                  className="hover:text-white transition-colors duration-300 ease-in-out"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="aa">
          <h3 className="text-lg font-semibold text-sky-400 mb-3">Contact Us</h3>
          <p className="text-sm">📍 123 Dream Street, Lagos, Nigeria</p>
          <p className="text-sm">📞 +234 9046530397, +234 9068018420</p>
          <p className="text-sm">✉️ reservations@dreamhotel.com</p>

          {/* Socials */}
          <div className="flex space-x-4 mt-4 text-xl">
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transform hover:scale-110 transition-all duration-300 ease-in-out"
            >
              <FaGoogle />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transform hover:scale-110 transition-all duration-300 ease-in-out"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transform hover:scale-110 transition-all duration-300 ease-in-out"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center text-gray-500 text-sm mt-12 border-t border-gray-700 pt-5">
        © {new Date().getFullYear()} DreamHotel. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

