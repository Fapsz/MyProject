
import React, { useEffect, useState } from "react";

function AdminMessages() {
  const [messages, setMessages] = useState([]);

  // Fetch all messages from backend
  useEffect(() => {
    fetchMessages();
  }, []);

  const API_URL = "https://dreambackend-fnr6.onrender.com";

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/users/messages`, {
        method: "GET",
      }); 
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  // Delete a message
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    try {
      await fetch(`http://localhost:3004/users/messages/${id}`, {
        method: "DELETE",
      });
      fetchMessages(); // refresh after delete
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>

      {messages.length === 0 ? (
        <p className="text-gray-600">No messages yet.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((m) => (
            <li key={m._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold">
                {m.name} ({m.email})
              </h3>
              <p className="text-gray-600">{m.body}</p>
              <button
                onClick={() => handleDelete(m._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminMessages;
