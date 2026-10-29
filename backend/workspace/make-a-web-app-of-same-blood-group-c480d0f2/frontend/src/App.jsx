import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ItemPage from "./pages/ItemPage.jsx";
import RecordPage from "./pages/RecordPage.jsx";
import ActivityPage from "./pages/ActivityPage.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex gap-6 items-center">
        <span className="font-bold text-lg text-gray-800">A web app of same blood group</span>
        <Link to="/" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/items" className="hover:text-blue-600">Items</Link>
          <Link to="/records" className="hover:text-blue-600">Records</Link>
          <Link to="/activitys" className="hover:text-blue-600">Activitys</Link>
        <Link to="/login" className="ml-auto hover:text-blue-600">Login</Link>
      </nav>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
        <Route path="/items" element={<ItemPage />} />
        <Route path="/records" element={<RecordPage />} />
        <Route path="/activitys" element={<ActivityPage />} />
        </Routes>
      </main>
    </div>
  );
}
