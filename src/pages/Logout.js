import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token
    localStorage.removeItem("token");

    // Optional: Add a small delay or message before redirect
    setTimeout(() => {
      navigate("/login");
    }, 500);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen pt-24">
      <h2 className="text-xl font-semibold text-gray-700">Logging you out...</h2>
    </div>
  );
}

export default Logout;
