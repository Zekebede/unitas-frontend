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
    <div className="pt-24 px-4 min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-4xl font-bold text-blue-700 mb-8 text-center">📊 Dashboard Overview</h2>

        {loading ? (
          <p className="text-gray-600 text-center text-lg">Loading dashboard data...</p>
        ) : error ? (
          <p className="text-red-600 text-center text-lg">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Total Contribution */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Contributions</h3>
              <p className="text-5xl font-bold text-green-600">${total.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-2">Sum of all your contributions</p>
            </div>

            {/* Card 2: Placeholder for Future Chart or Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Upcoming Insights</h3>
              <p className="text-gray-500">
                More detailed analytics and charts coming soon.
              </p>
              <div className="mt-4 h-32 flex items-center justify-center bg-gray-100 rounded-lg text-gray-400 text-sm border border-dashed border-gray-300">
                📈 Chart placeholder
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
