import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  const [formData, setFormData] = useState({
    fullname: "",
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

      const response = await fetch("https://localhost:3004/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Signup successful:", data);

      // ✅ Redirect to /rooms after signup
      if (response.ok) {
        navigate("/rooms");
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white flex-col gap-4 shadow-lg relative">
      <h1 className="text-3xl font-bold text-center">
        <span className="text-blue-600">Sign </span>
        <span className="text-gray-200">Up</span>
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-8 w-80">
        <label className="flex flex-col">
          Full Name:
          <input
            onChange={handleChange}
            type="text"
            name="fullname"
            className="mt-1 p-2 bg-gray-800 border border-gray-700 rounded"
            required
          />
        </label>

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

        <div className="relative flex flex-col">
          Password:
          <input
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            name="password"
            className="mt-1 p-2 bg-gray-800 border border-gray-700 rounded pr-10"
            value={formData.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-white focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" className="mt-4 p-2 bg-blue-600 rounded hover:bg-blue-700">
          Signup
        </button>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="flex items-center justify-center gap-2 mt-2 p-2 border border-gray-600 rounded hover:bg-gray-800"
        >
          <FcGoogle size={20} /> Sign up with Google
        </button>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
