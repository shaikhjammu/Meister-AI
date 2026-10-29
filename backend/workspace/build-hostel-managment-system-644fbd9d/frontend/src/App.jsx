import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import RecordPage from "./pages/RecordPage.jsx";
import ActivityLogPage from "./pages/ActivityLogPage.jsx";
import ReportPage from "./pages/ReportPage.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex gap-6 items-center">
        <span className="font-bold text-lg text-gray-800">Hostel managment system</span>
        <Link to="/" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/records" className="hover:text-blue-600">Records</Link>
          <Link to="/activityLogs" className="hover:text-blue-600">ActivityLogs</Link>
          <Link to="/reports" className="hover:text-blue-600">Reports</Link>
        <Link to="/login" className="ml-auto hover:text-blue-600">Login</Link>
      </nav>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
        <Route path="/records" element={<RecordPage />} />
        <Route path="/activityLogs" element={<ActivityLogPage />} />
        <Route path="/reports" element={<ReportPage />} />
        </Routes>
      </main>
    </div>
  );
}
