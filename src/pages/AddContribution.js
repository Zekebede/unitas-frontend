// src/pages/AddContribution.js
import { useState } from "react";
import axios from "axios";

function AddContribution() {
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Unauthorized. Please login first.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://unitas-backend-wt3p.onrender.com/api/contributions/add",
        { amount, month },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("✅ Contribution added successfully.");
      setAmount("");
      setMonth("");
    } catch (err) {
      console.error("❌ Error adding contribution:", err);
      setMessage("Failed to add contribution.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 flex justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Add Contribution
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Amount ($)
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Month
            </label>
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="e.g. March"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Contribution"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-600 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AddContribution;
