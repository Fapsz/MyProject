import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // Sidebar items
  const menuItems = [
    { name: "Dashboard", path: "/admins/dashboard" },
    { name: "Users", path: "/admins/users" },
    { name: "Messages", path: "/admins/messages" },
    { name: "Rooms", path: "/admins/rooms" },
    { name: "Guests", path: "/admins/guests" },
    { name: "Reports", path: "/admins/reports" },
    { name: "Bookings", path: "/admins/bookings" },
  ];

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      // If you have a backend logout API, call it here:
      await fetch("http://localhost:3004/users/logout", {
        method: "POST",
        credentials: "include", // ensures cookies are cleared if using sessions
      });

      // Clear localStorage/sessionStorage if you store tokens there
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded-lg mb-2 ${
                location.pathname === item.path
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Admin</span>
            <img
              src="/admin-1.jpg"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
