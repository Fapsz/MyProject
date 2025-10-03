import React, { useState, useEffect } from "react";

function Guest() {
  const [guests, setGuests] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(null);
  const [newGuest, setNewGuest] = useState({
    name: "",
    email: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
  });

  useEffect(() => {
    const dummyGuests = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        roomType: "Deluxe",
        checkIn: "2025-09-01",
        checkOut: "2025-09-05",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        roomType: "Suite",
        checkIn: "2025-09-03",
        checkOut: "2025-09-07",
      },
      {
        id: 3,
        name: "Michael Smith",
        email: "mike@example.com",
        roomType: "Standard",
        checkIn: "2025-09-02",
        checkOut: "2025-09-04",
      },
    ];
    setGuests(dummyGuests);
  }, []);

  const handleAddGuest = () => {
    if (!newGuest.name || !newGuest.email) {
      alert("Please fill all fields!");
      return;
    }
    const id = guests.length + 1;
    setGuests([...guests, { id, ...newGuest }]);
    setNewGuest({
      name: "",
      email: "",
      roomType: "",
      checkIn: "",
      checkOut: "",
    });
    setShowAddModal(false);
  };

  const handleRemoveGuest = (id) => {
    if (window.confirm("Are you sure you want to remove this guest?")) {
      setGuests(guests.filter((g) => g.id !== id));
    }
  };

  // ✅ Fixed search with .trim()
  const filteredGuests = guests.filter((g) => {
    const query = search.toLowerCase().trim();
    return (
      g.name.toLowerCase().includes(query) ||
      g.email.toLowerCase().includes(query) ||
      g.roomType.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Guest Management
      </h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search guests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-sky-300"
        />
        {/* Clear Button */}
        {search && (
          <button
            onClick={() => setSearch("")}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            ❌
          </button>
        )}
      </div>

      {/* Guest Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-700">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Room Type</th>
              <th className="p-3">Check In</th>
              <th className="p-3">Check Out</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuests.length > 0 ? (
              filteredGuests.map((guest, index) => (
                <tr
                  key={guest.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium">{guest.name}</td>
                  <td className="p-3">{guest.email}</td>
                  <td className="p-3">{guest.roomType}</td>
                  <td className="p-3">{guest.checkIn}</td>
                  <td className="p-3">{guest.checkOut}</td>
                  <td className="p-3 space-x-2">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={() => setShowViewModal(guest)}
                    >
                      View
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      onClick={() => handleRemoveGuest(guest.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No guests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Guest Button */}
      <div className="text-center mt-6">
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700"
          onClick={() => setShowAddModal(true)}
        >
          + Add Guest
        </button>
      </div>

      {/* View Guest Modal */}
      {showViewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h2 className="text-xl font-bold text-sky-700 mb-4">Guest Details</h2>
            <p><span className="font-semibold">Name:</span> {showViewModal.name}</p>
            <p><span className="font-semibold">Email:</span> {showViewModal.email}</p>
            <p><span className="font-semibold">Room Type:</span> {showViewModal.roomType}</p>
            <p><span className="font-semibold">Check In:</span> {showViewModal.checkIn}</p>
            <p><span className="font-semibold">Check Out:</span> {showViewModal.checkOut}</p>
            <button
              className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
              onClick={() => setShowViewModal(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Guest Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h2 className="text-xl font-bold text-sky-700 mb-4">Add New Guest</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={newGuest.name}
              onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={newGuest.email}
              onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="text"
              placeholder="Room Type"
              value={newGuest.roomType}
              onChange={(e) =>
                setNewGuest({ ...newGuest, roomType: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="date"
              value={newGuest.checkIn}
              onChange={(e) =>
                setNewGuest({ ...newGuest, checkIn: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="date"
              value={newGuest.checkOut}
              onChange={(e) =>
                setNewGuest({ ...newGuest, checkOut: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            />
            <button
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mb-2"
              onClick={handleAddGuest}
            >
              Add Guest
            </button>
            <button
              className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Hotel Images Section */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center mt-20">
        Hotel Guest Management System
      </h1>
      <div className="bg-gray-200 text-white mt-10 p-6 rounded-t-3xl grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {["/ayo-1.jpg","/ayo-2.jpg","/ayo-3.jpg","/ayo-4.jpg","/ayo-5.jpg","/ayo-6.jpg"].map((img, i) => (
          <div key={i} className="h-[200px] overflow-hidden rounded-xl shadow-lg">
            <img
              src={img}
              alt={`Guest ${i+1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guest;
