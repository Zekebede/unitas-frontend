// src/pages/AdminDashboard.js
import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Unauthorized. Please login first.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "https://unitas-backend-wt3p.onrender.com/api/admin/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(res.data);
      } catch (error) {
        setMessage("Failed to load admin dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Admin Dashboard
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : message ? (
          <p className="text-red-600 text-center">{message}</p>
        ) : (
          <>
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-700">
                Total Contributions
              </h3>
              <p className="text-4xl font-bold text-green-600">
                ${data?.totalContributions?.toFixed(2)}
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              User Payment Status
            </h3>
            <table className="w-full border border-gray-300 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.userStatus.map((user) => (
                  <tr key={user.email}>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td
                      className={`px-4 py-2 border font-semibold ${
                        user.status === "Paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {user.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
