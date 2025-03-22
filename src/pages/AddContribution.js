// src/pages/AddContribution.js
import { useState } from "react";
import axios from "axios";

function AddContribution() {
  const [formData, setFormData] = useState({
    amount: "",
    month: "",
    status: "Paid",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/contributions/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Contribution submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting contribution:", error);
      alert("Failed to submit contribution.");
    }
  };

  return (
    <div className="pt-24 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Add Contribution</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="month"
            placeholder="Month (e.g., March 2025)"
            value={formData.month}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          <textarea
            name="note"
            placeholder="Note (optional)"
            value={formData.note}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddContribution;
