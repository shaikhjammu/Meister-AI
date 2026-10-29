import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import TeacherPage from "./pages/TeacherPage.jsx";
import ClassPage from "./pages/ClassPage.jsx";
import AttendancePage from "./pages/AttendancePage.jsx";
import GradePage from "./pages/GradePage.jsx";
import TimetablePage from "./pages/TimetablePage.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex gap-6 items-center">
        <span className="font-bold text-lg text-gray-800">School & Student Portal System</span>
        <Link to="/" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/students" className="hover:text-blue-600">Students</Link>
          <Link to="/teachers" className="hover:text-blue-600">Teachers</Link>
          <Link to="/classs" className="hover:text-blue-600">Classs</Link>
          <Link to="/attendances" className="hover:text-blue-600">Attendances</Link>
          <Link to="/grades" className="hover:text-blue-600">Grades</Link>
          <Link to="/timetables" className="hover:text-blue-600">Timetables</Link>
        <Link to="/login" className="ml-auto hover:text-blue-600">Login</Link>
      </nav>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
        <Route path="/students" element={<StudentPage />} />
        <Route path="/teachers" element={<TeacherPage />} />
        <Route path="/classs" element={<ClassPage />} />
        <Route path="/attendances" element={<AttendancePage />} />
        <Route path="/grades" element={<GradePage />} />
        <Route path="/timetables" element={<TimetablePage />} />
        </Routes>
      </main>
    </div>
  );
}
