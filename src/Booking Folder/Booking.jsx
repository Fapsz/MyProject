import React, { useState } from "react";
import axios from "axios";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await post("http://localhost:3004/users/bookings", formData);

      // ✅ Success message
      setMessage("✅ Booking successful!");
      
      // Redirect after short delay (so user sees the message first)
      setTimeout(() => {
        navigate("/thank-you", { state: { booking: res.data } });
      }, 1500);

    } catch (err) {
      console.error(err);

      // Show clear error message
      if (formData.roomType === "") {
        setMessage("❌ Please select a room before booking.");
      } else {
        setMessage("❌ Error submitting booking. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center bg-gradient-to-r from-gray-900 to-sky-600">
        <h1 className="text-white text-4xl font-bold">Book Your Stay</h1>
      </section>

      {/* Booking Form */}
      <section className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 -mt-16 mb-12 relative z-10">
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-sky-500"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-sky-500"
              placeholder="john@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-sky-500"
              placeholder="+234 800 000 0000"
            />
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Room Type</label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-sky-500"
            >
              <option value="">Select Room</option>
              <option value="single">Single Room</option>
              <option value="double">Double Room</option>
              <option value="suite">Luxury Suite</option>
            </select>
          </div>

          {/* Check-in */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Check-In</label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Check-out */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Check-Out</label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Guests</label>
            <input
              type="number"
              name="guests"
              min="1"
              value={formData.guests}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Submit */}
          <div className="col-span-2 mt-6 text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-lg disabled:bg-gray-400"
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
