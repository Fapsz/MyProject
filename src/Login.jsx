import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await fetch("http://localhost:3004/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        return alert(data.message || "Login failed");
      } else {
        console.log("Login successful:", data);

        // ✅ Check user role
        if (data.user && data.user.role === "Admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/room"); // normal user
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // 👉 Redirect to Gmail login page
  const handleGoogleLogin = () => {
    window.location.href =
      "https://accounts.google.com/signin/v2/identifier";
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white flex-col gap-4">
      <h1 className="text-3xl font-bold text-center">
        <span className="text-blue-600">Log </span>
        <span className="text-gray-200">In</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 mt-8 w-80"
      >
        {/* Email */}
        <label className="flex flex-col">
          Email:
          <input
            onChange={handleChange}
            type="email"
            name="email"
            className="mt-1 p-2 bg-gray-800 border border-gray-700 rounded"
            required
          />
        </label>

        {/* Password */}
        <div className="relative flex flex-col">
          Password:
          <input
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            name="password"
            className="mt-1 p-2 bg-gray-800 border border- rounded pr-10"
            value={formData.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Normal Login */}
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Login
        </button>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 mt-2 p-2 border border-gray-600 rounded hover:bg-gray-800"
        >
          <FcGoogle size={20} /> Login with Google
        </button>

        {/* Signup link */}
        <p className="text-center text-gray-400 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
