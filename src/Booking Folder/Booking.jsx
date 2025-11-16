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

  const API_URL = "https://dreambackend-fnr6.onrender.com";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/users/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // ✔ correct payload
      });

      const data = await response.json();
      console.log("BOOKING RESPONSE:", data);

      if (response.ok) {
        setMessage("✅ Booking successful!");

        // redirect after success
        setTimeout(() => {
          navigate("/thank-you", { state: { booking: data } });
        }, 1500);
      } else {
        setMessage("❌ Booking failed: " + (data.message || "Try again"));
      }
    } catch (error) {
      console.error("BOOKING ERROR:", error);
      setMessage("❌ Unable to connect to server.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Hero */}
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
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border rounded-lg p-3 focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border rounded-lg p-3 focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border rounded-lg p-3 focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

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

          <div className="flex flex-col sm:col-span-2">
            <label className="text-gray-700 font-medium mb-2">Guests</label>
            <input
              type="number"
              name="guests"
              value={formData.guests}
              min="1"
              onChange={handleChange}
              required
              className="border rounded-lg p-3 focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          <div className="col-span-1 sm:col-span-2 mt-6 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-8 py-3 rounded-lg disabled:bg-gray-400"
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
