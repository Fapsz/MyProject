import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Booking() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const API_URL = "https://dreambackend-fnr6.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/user/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage("✅ Booking successful!");

      // Show success message for 1.5s then navigate
      setTimeout(() => {
        navigate("/thank-you", { state: { booking: data } });
      }, 1500);
    } catch (err) {
      console.error("Booking error:", err);
      setMessage(
        formData.roomType === ""
          ? "❌ Please select a room before booking."
          : "❌ Error submitting booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[250px] sm:h-[300px] flex items-center justify-center bg-gradient-to-r from-gray-900 to-sky-600 text-center px-4">
        <h1 className="text-white text-3xl sm:text-4xl font-bold tracking-wide">
          Book Your Stay
        </h1>
      </section>

      {/* Booking Form */}
      <section className="max-w-4xl w-full mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 -mt-12 sm:-mt-16 mb-12 relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Reservation Form
        </h2>

        {/* Message */}
        {message && (
          <p
            className={`text-center mb-4 font-medium text-lg ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border rounded-lg p-3 focus:ring-2 focus:ring-sky-500 outline-none"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border rounded-lg p-3 focus:ring-2 focus:ring-sky-500 outline-none"
              placeholder="john@example.com"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border rounded-lg p-3 focus:ring-2 focus:ring-sky-500 outline-none"
              placeholder="+234 800 000 0000"
            />
          </div>

          {/* Room Type */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Room Type</label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              required
              className="border rounded-lg p-3 focus:ring-2 focus:ring-sky-500 outline-none"
            >
              <option value="">Select Room</option>
              <option value="single">Single Room</option>
              <option value="double">Double Room</option>
              <option value="suite">Luxury Suite</option>
            </select>
          </div>

          {/* Check-In */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Check-In</label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
              className="border rounded-lg p-3 focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          {/* Check-Out */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Check-Out</label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
              className="border rounded-lg p-3 focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col sm:col-span-2">
            <label className="text-gray-700 font-medium mb-2">Guests</label>
            <input
              type="number"
              name="guests"
              min="1"
              value={formData.guests}
              onChange={handleChange}
              required
              className="border rounded-lg p-3 focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          {/* Submit */}
          <div className="col-span-1 sm:col-span-2 mt-6 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200 disabled:bg-gray-400"
            >
              {loading ? "Submitting..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Booking;
