import React, { useState, useEffect } from "react";

function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    status: "Available",
  });

  // Fetch all rooms on load
  useEffect(() => {
    fetchRooms();
  }, []);

  const API_URL = "https://dreambackend-fnr6.onrender.com";

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/users/rooms`, {
        method: "GET",
      });
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update room
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editRoom) {
        // Update
        await fetch(
          `https://dreambackend-fnr6.onrender.com/users/rooms/${editRoom._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
      } else {
        // Create
        await fetch("4/user/rooms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      setFormData({ name: "", price: "", status: "Available" });
      setShowForm(false);
      setEditRoom(null);
      fetchRooms(); // refresh
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  // Edit room
  const handleEdit = (room) => {
    setFormData({
      name: room.name,
      price: room.price,
      status: room.status,
    });
    setEditRoom(room);
    setShowForm(true);
  };

  // Delete room
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    try {
      await fetch(`https://dreambackend-fnr6.onrender.com/users/rooms/${id}`, {
        method: "DELETE",
      });
      fetchRooms(); // refresh
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Rooms</h2>

      {/* Add Room Button */}
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditRoom(null);
          setFormData({ name: "", price: "", status: "Available" });
        }}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? "Cancel" : "+ Add Room"}
      </button>

      {/* Add/Edit Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 shadow-md rounded mb-6"
        >
          <div className="mb-2">
            <label className="block font-medium">Room Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editRoom ? "Update Room" : "Save Room"}
          </button>
        </form>
      )}

      {/* Rooms Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Room</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((r) => (
            <tr key={r._id}>
              <td className="border p-2">{r.name}</td>
              <td className="border p-2">{r.price}</td>
              <td className="border p-2">{r.status}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(r)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(r._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminRooms;
