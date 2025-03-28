// src/pages/Register.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
    referredBy: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Capture ?ref= from URL on first load
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const ref = searchParams.get("ref");
    if (ref) {
      setFormData((prev) => ({ ...prev, referredBy: ref }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", formData);
      setMessage("✅ Registration successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("❌ Registration error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="pt-24 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Register for አሌክሳንድሪያ እድር</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
          </select>

          {/* Hidden input for referredBy */}
          {formData.referredBy && (
            <input
              type="hidden"
              name="referredBy"
              value={formData.referredBy}
            />
          )}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Register
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
}

export default Register;
