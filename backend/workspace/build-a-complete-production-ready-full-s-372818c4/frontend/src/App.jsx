import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import TaskPage from "./pages/TaskPage.jsx";
import BoardColumnPage from "./pages/BoardColumnPage.jsx";
import CommentPage from "./pages/CommentPage.jsx";
import TagPage from "./pages/TagPage.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex gap-6 items-center">
        <span className="font-bold text-lg text-gray-800">Kanban Task & Project Management System</span>
        <Link to="/" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/projects" className="hover:text-blue-600">Projects</Link>
          <Link to="/tasks" className="hover:text-blue-600">Tasks</Link>
          <Link to="/boardColumns" className="hover:text-blue-600">BoardColumns</Link>
          <Link to="/comments" className="hover:text-blue-600">Comments</Link>
          <Link to="/tags" className="hover:text-blue-600">Tags</Link>
        <Link to="/login" className="ml-auto hover:text-blue-600">Login</Link>
      </nav>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/boardColumns" element={<BoardColumnPage />} />
        <Route path="/comments" element={<CommentPage />} />
        <Route path="/tags" element={<TagPage />} />
        </Routes>
      </main>
    </div>
  );
}
