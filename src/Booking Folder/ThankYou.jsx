import React from "react";
import { useLocation } from "react-router-dom";

function ThankYou() {
  const { state } = useLocation();
  const booking = state?.booking;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl text-center w-[400px]">
        <h1 className="text-3xl font-bold text-green-600">Booking Successful</h1>

        <p className="mt-3 text-gray-700">
          Thank you, {booking?.name}! Your room is booked.
        </p>

        <p className="mt-3">
          <strong>Room:</strong> {booking?.roomType}
        </p>

        <p>
          <strong>Check-In:</strong> {booking?.checkIn}
        </p>

        <p>
          <strong>Check-Out:</strong> {booking?.checkOut}
        </p>

        <p className="mt-5 text-sky-600 font-semibold">
          We look forward to having you!
        </p>
      </div>
    </div>
  );
}

export default ThankYou;
