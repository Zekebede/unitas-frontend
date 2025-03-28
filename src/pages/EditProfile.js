// src/pages/EditProfile.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setMessage("Unauthorized access");

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setName(res.data.user.name);
        setEmail(res.data.user.email);
      } catch (err) {
        setMessage("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/profile`,
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "✅ Profile updated!");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      setMessage("❌ Failed to update profile.");
    }
  };

  return (
    <div className="pt-24 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl w-full">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Edit Profile</h2>

        {message && <p className="text-center text-red-600 mb-4">{message}</p>}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
            >
              Update Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditProfile;
