// src/pages/admin/AdminReports.jsx
import React, { useState, useEffect } from "react";

function AdminReports() {
  const [reports, setReports] = useState([]);
  const [editReport, setEditReport] = useState(null);
  const [formData, setFormData] = useState({ title: "", value: "" });

  // Fetch reports from backend
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dreambackend-fnr6.onrender.com/user/reports");
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save (update) report
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editReport) {
        await fetch(`https://dreambackend-fnr6.onrender.com/user/reports/${editReport._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setEditReport(null);
        setFormData({ title: "", value: "" });
        fetchReports();
      }
    } catch (err) {
      console.error("Error updating report:", err);
    }
  };

  // Edit button
  const handleEdit = (report) => {
    setEditReport(report);
    setFormData({ title: report.title, value: report.value });
  };

  // Delete button
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      await fetch(`https://dreambackend-fnr6.onrender.com/users/reports/${id}`, {
        method: "DELETE",
      });
      fetchReports();
    } catch (err) {
      console.error("Error deleting report:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reports & Analytics</h2>

      {/* Edit Form */}
      {editReport && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 shadow rounded mb-4"
        >
          <div className="mb-2">
            <label className="block font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold">Value</label>
            <input
              type="text"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </form>
      )}

      {/* Reports Grid */}
      <div className="grid grid-cols-2 gap-6">
        {reports.map((r) => (
          <div
            key={r._id}
            className="bg-white p-6 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{r.title}</h3>
              <p className="text-2xl">{r.value}</p>
            </div>
            <div className="flex gap-2">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminReports;
