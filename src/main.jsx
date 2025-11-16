import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// ✅ User Pages
import Home from "./Home Folder/Home.jsx";
import About from "./About Folder/About.jsx";
import Room from "./Room Folder/Room.jsx";
import Guest from "./Guest Folder/Guest.jsx";
import Contact from "./Contact Folder/Contact.jsx";
import Booking from "./Booking Folder/Booking.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import AdminReports from "./Admins Folder/AdminReports.jsx";
import AdminGuests from "./Admins Folder/AdminGuests.jsx";
import AdminBookings from "./Admins Folder/AdminBookings.jsx";
import AdminMessages from "./Admins Folder/AdminMesseges.jsx";
import AdminRooms from "./Admins Folder/AdminRooms.jsx";
import AdminDashboard from "./Admins Folder/AdminDashboard.jsx";
import AdminUsers from "./Admins Folder/AdminUsers.jsx";
import ThankYou from "./Booking Folder/ThankYou.jsx";

function AppWrapper() {
  const location = useLocation();

  // Hide header & footer on signup, login, and admin pages
  const hideLayout =
    ["/signup", "/login"].includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Header />}
      <Routes>
        {/* User Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/room" element={<Room />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admins/dashboard" element={<AdminDashboard />} />
        <Route path="/admins/users" element={<AdminUsers />} />
        <Route path="/admins/messages" element={<AdminMessages />} />
        <Route path="/admins/rooms" element={<AdminRooms />} />
        <Route path="/admins/guests" element={<AdminGuests />} />
        <Route path="/admins/reports" element={<AdminReports />} />
        <Route path="/admins/bookings" element={<AdminBookings />} />
        <Route path="/thankyou/booking" element={<ThankYou />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </StrictMode>
);
