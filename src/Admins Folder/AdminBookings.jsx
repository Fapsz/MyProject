
import React, { useEffect, useState } from "react";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from backend
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:3004/users/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  // Approve booking
  const handleApprove = async (id) => {
    try {
      await fetch(`http://localhost:3004/users/bookings/${id}/approve`, {
        method: "PUT",
      });
      fetchBookings(); // refresh data
    } catch (err) {
      console.error("Error approving booking:", err);
    }
  };

  // Cancel booking
  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await fetch(`http://localhost:3004/users/bookings/${id}/cancel`, {
        method: "PUT",
      });
      fetchBookings();
    } catch (err) {
      console.error("Error cancelling booking:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Guest</th>
            <th className="border p-2">Room</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td className="border p-2">{b.guest}</td>
              <td className="border p-2">{b.room}</td>
              <td className="border p-2">{b.date}</td>
              <td className="border p-2">{b.status}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleApprove(b._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleCancel(b._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBookings;
