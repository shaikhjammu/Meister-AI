import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import PatientPage from "./pages/PatientPage.jsx";
import DoctorPage from "./pages/DoctorPage.jsx";
import AppointmentPage from "./pages/AppointmentPage.jsx";
import MedicalRecordPage from "./pages/MedicalRecordPage.jsx";
import PrescriptionPage from "./pages/PrescriptionPage.jsx";
import DepartmentPage from "./pages/DepartmentPage.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex gap-6 items-center">
        <span className="font-bold text-lg text-gray-800">Hospital Management System</span>
        <Link to="/" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/patients" className="hover:text-blue-600">Patients</Link>
          <Link to="/doctors" className="hover:text-blue-600">Doctors</Link>
          <Link to="/appointments" className="hover:text-blue-600">Appointments</Link>
          <Link to="/medicalRecords" className="hover:text-blue-600">MedicalRecords</Link>
          <Link to="/prescriptions" className="hover:text-blue-600">Prescriptions</Link>
          <Link to="/departments" className="hover:text-blue-600">Departments</Link>
        <Link to="/login" className="ml-auto hover:text-blue-600">Login</Link>
      </nav>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
        <Route path="/patients" element={<PatientPage />} />
        <Route path="/doctors" element={<DoctorPage />} />
        <Route path="/appointments" element={<AppointmentPage />} />
        <Route path="/medicalRecords" element={<MedicalRecordPage />} />
        <Route path="/prescriptions" element={<PrescriptionPage />} />
        <Route path="/departments" element={<DepartmentPage />} />
        </Routes>
      </main>
    </div>
  );
}
