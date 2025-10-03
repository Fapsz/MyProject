import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaInstagram } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Thank you for contacting DreamHotel. We’ll get back to you soon!");
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      {/* Header */}
      <h2 className="text-4xl font-bold text-center text-sky-700 mb-8">
        Contact Us
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Get in Touch
          </h3>
          <p className="text-gray-600 mb-6">
            Have questions or special requests? Our DreamHotel team is here to
            assist you 24/7. Reach us through the details below or send us a
            quick message.
          </p>

          <div className="space-y-4 text-gray-700">
            <p>📍 123 Dream Street, Lagos, Nigeria</p>
            <p>📞 +234 9046530397 | +234 9068018420</p>
            <p>✉️ reservations@dreamhotel.com</p>
          </div>

          {/* Social Media */}
          <div className="flex space-x-6 mt-6 text-2xl text-sky-600">
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 transform hover:scale-110 transition-all duration-300 ease-in-out"
            >
              <FaGoogle />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transform hover:scale-110 transition-all duration-300 ease-in-out"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-700 transform hover:scale-110 transition-all duration-300 ease-in-out"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Send Us a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Show loading spinner or message while waiting for API */}
            {loading && (
              <div className="w-full flex justify-center mb-2">
                <span className="text-sky-600 font-bold">Sending...</span>
              </div>
            )}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              disabled={loading}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              disabled={loading}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              disabled={loading}
            ></textarea>

            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-3 rounded-lg font-bold hover:bg-sky-700 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* Map */}
      <div className="max-w-6xl mx-auto mt-12">
        <iframe
          title="DreamHotel Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.905052239295!2d3.3792!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b0f6e8a8f2d%3A0x1b36b4dbe40b9a64!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1700000000000"
          width="100%"
          height="350"
          allowFullScreen=""
          loading="lazy"
          className="rounded-2xl shadow-lg"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
