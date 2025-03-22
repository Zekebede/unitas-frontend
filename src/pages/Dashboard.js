// src/pages/Dashboard.js
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTotal = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized - Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/api/contributions/my-contributions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const contributions = res.data || [];
        const totalAmount = contributions.reduce((sum, c) => sum + c.amount, 0);
        setTotal(totalAmount);
      } catch (err) {
        setError("Failed to load dashboard data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTotal();
  }, []);

  return (
    <div className="pt-24 px-6 min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Dashboard Summary</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              Total Contributions:
            </h3>
            <p className="text-4xl font-bold text-green-600">${total.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
