
import React, { useEffect, useState } from "react";

function AdminGuests() {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await fetch("https://dreambackend-fnr6.onrender.com/guests", {
          method: "GET",
          credentials: "include", // keep cookies/session
        });
        const data = await response.json();
        setGuests(data);
      } catch (error) {
        console.error("Error fetching guests:", error);
      }
    };
    fetchGuests();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Guests</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Stay</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {guests.length > 0 ? (
            guests.map((g) => (
              <tr key={g._id}>
                <td className="border p-2">
                  {g.user?.fullname || g.name}
                </td>
                <td className="border p-2">
                  {g.nights
                    ? `${g.nights} nights`
                    : `${g.checkIn} → ${g.checkOut}`}
                </td>
                <td className="border p-2">{g.status || "Pending"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No guests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    
  );
}

export default AdminGuests;
