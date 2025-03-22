// src/pages/ViewContributions.js
import { useEffect, useState } from "react";
import axios from "axios";

function ViewContributions() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContributions = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to view contributions.");
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
        console.log("✅ Contributions fetched:", res.data);
        // Update this line if response is wrapped
        setContributions(res.data);
      } catch (err) {
        console.error("❌ Error fetching contributions:", err);
        setError("Error fetching contributions.");
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  return (
    <div className="pt-24 px-4 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">My Contributions</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : contributions.length === 0 ? (
          <p>No contributions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 mt-6">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-4 border">Amount</th>
                  <th className="py-2 px-4 border">Month</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Note</th>
                  <th className="py-2 px-4 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((contribution, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="py-2 px-4 border">${contribution.amount}</td>
                    <td className="py-2 px-4 border">{contribution.month}</td>
                    <td className="py-2 px-4 border">{contribution.status}</td>
                    <td className="py-2 px-4 border">{contribution.note || "—"}</td>
                    <td className="py-2 px-4 border">
                      {contribution.createdAt
                        ? new Date(contribution.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewContributions;
