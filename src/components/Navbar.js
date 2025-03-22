import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    setIsAuthenticated(!!token);
    setUserRole(user?.role || "");
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const navRoutes = [
    { path: "/", label: "Home", alwaysShow: true },
    { path: "/dashboard", label: "Dashboard", protected: true },
    { path: "/profile", label: "Profile", protected: true },
    { path: "/add-contribution", label: "Add Contribution", protected: true },
    { path: "/my-contributions", label: "My Contributions", protected: true },
    { path: "/bank-transfer", label: "Bank Transfer", protected: true },
    { path: "/admin-dashboard", label: "Admin Dashboard", protected: true, adminOnly: true },
    { path: "/login", label: "Login", guestOnly: true },
    { path: "/register", label: "Register", guestOnly: true },
    { path: "/logout", label: "Logout", protected: true },
  ];

  const renderLink = ({ path, label }) => (
    <Link
      to={path}
      key={path}
      className={`text-lg font-medium transition duration-200 ${
        isActive(path)
          ? "text-yellow-300 border-b-2 border-yellow-300"
          : "text-white hover:text-gray-300"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-blue-600 p-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <h1 className="text-white text-2xl font-bold font-sans">
            Project Unitas
          </h1>
        </div>

        <ul className="hidden md:flex space-x-6">
          {navRoutes.map((route) => {
            if ((route.protected && !isAuthenticated) || (route.guestOnly && isAuthenticated)) {
              return null;
            }
            if (route.adminOnly && userRole !== "Admin") {
              return null;
            }
            return <li key={route.path}>{renderLink(route)}</li>;
          })}
        </ul>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-700 p-4 absolute top-16 left-0 w-full shadow-md">
          <ul className="flex flex-col space-y-4">
            {navRoutes.map((route) => {
              if ((route.protected && !isAuthenticated) || (route.guestOnly && isAuthenticated)) {
                return null;
              }
              if (route.adminOnly && userRole !== "Admin") {
                return null;
              }
              return (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className="block text-white text-lg font-medium text-center hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
