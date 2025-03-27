import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // at top if not already


function Profile() {
  const [user, setUser] = useState(null);
  const [totalContribution, setTotalContribution] = useState(0);
  const [contributionSummary, setContributionSummary] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You must be logged in to view this page.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data.user);
        setTotalContribution(res.data.totalContribution || 0);
        setContributionSummary(res.data.contributionSummary || {});
      } catch (error) {
        setMessage("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="pt-24 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-blue-600">Your Profile</h2>
        {message && <p className="text-red-600 mt-2">{message}</p>}
        {loading ? (
          <p className="text-gray-600 mt-4">Loading user data...</p>
        ) : user ? (
          <div className="mt-4">
            <p className="text-gray-600"><strong>Name:</strong> {user.name}</p>
            <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-600"><strong>Role:</strong> {user.role}</p>
            <p className="text-gray-600 mt-2"><strong>Total Contributions:</strong> ${totalContribution}</p>
            <Link
               to="/edit-profile"
              className="inline-block mt-2 text-blue-600 underline hover:text-blue-800"
           >
           ✏️ Edit Profile
           </Link>

            <h3 className="text-xl font-semibold mt-6 mb-2">Contribution Summary</h3>
            {Object.keys(contributionSummary).length > 0 ? (
              Object.entries(contributionSummary).map(([year, months]) => (
                <div key={year} className="mb-4">
                  <h4 className="text-lg font-bold text-gray-700">{year}</h4>
                  <table className="w-full border border-gray-300 rounded-md mt-2">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border">Month</th>
                        <th className="px-4 py-2 border">Amount ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(months).map(([month, amount]) => (
                        <tr key={month}>
                          <td className="px-4 py-2 border">{month}</td>
                          <td className="px-4 py-2 border">${amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-2">No contributions found.</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Profile;
