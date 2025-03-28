// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ Make sure this path and export are correct
import AddContribution from "./pages/AddContribution";
import ViewContributions from "./pages/ViewContributions";
import AdminDashboard from "./pages/AdminDashboard";
import EditProfile from "./pages/EditProfile";
import BankTransfer from "./pages/BankTransfer";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* ✅ Add this line */}
        <Route path="/add-contribution" element={<AddContribution />} />
        <Route path="/my-contributions" element={<ViewContributions />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/bank-transfer" element={<BankTransfer />} />
        <Route path="/edit-profile" element={<EditProfile />} />

      </Routes>
    </Router>
  );
}

export default App;
