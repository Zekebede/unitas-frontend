// src/pages/AdminDashboard.js
import { useEffect, useState } from "react";
import axios from "axios";

const FRONTEND_URL = "https://unitas-frontend.onrender.com"; // Update if needed

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [referralCode, setReferralCode] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

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

  const generateReferralLink = () => {
    if (referralCode.trim()) {
      const link = `${FRONTEND_URL}/register?ref=${encodeURIComponent(referralCode.trim())}`;
      setGeneratedLink(link);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      alert("Referral link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy referral link.");
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
    }).format(amount);

  return (
    <div className="pt-24 min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Admin Dashboard
        </h2>

        {/* 🔗 Referral Link Generator */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Generate Referral Link</h3>
          <div className="flex flex-col md:flex-row gap-4 mb-2">
            <input
              type="text"
              placeholder="Enter name or referral code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="p-2 border rounded w-full"
            />
            <button
              onClick={generateReferralLink}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Generate
            </button>
          </div>
          {generatedLink && (
            <div className="bg-gray-100 p-3 rounded flex flex-col md:flex-row justify-between items-center gap-2">
              <code className="text-sm break-all">{generatedLink}</code>
              <button
                onClick={copyToClipboard}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
              >
                Copy Link
              </button>
            </div>
          )}
        </div>

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
                {formatCurrency(data?.totalContributions || 0)}
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
