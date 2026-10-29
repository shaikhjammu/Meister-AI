import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import WorkoutPlanPage from "./pages/WorkoutPlanPage.jsx";
import ExercisePage from "./pages/ExercisePage.jsx";
import MealLogPage from "./pages/MealLogPage.jsx";
import MacroNutrientPage from "./pages/MacroNutrientPage.jsx";
import ProgressRecordPage from "./pages/ProgressRecordPage.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex gap-6 items-center">
        <span className="font-bold text-lg text-gray-800">Fitness & Nutrition Tracker App</span>
        <Link to="/" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/workoutPlans" className="hover:text-blue-600">WorkoutPlans</Link>
          <Link to="/exercises" className="hover:text-blue-600">Exercises</Link>
          <Link to="/mealLogs" className="hover:text-blue-600">MealLogs</Link>
          <Link to="/macroNutrients" className="hover:text-blue-600">MacroNutrients</Link>
          <Link to="/progressRecords" className="hover:text-blue-600">ProgressRecords</Link>
        <Link to="/login" className="ml-auto hover:text-blue-600">Login</Link>
      </nav>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
        <Route path="/workoutPlans" element={<WorkoutPlanPage />} />
        <Route path="/exercises" element={<ExercisePage />} />
        <Route path="/mealLogs" element={<MealLogPage />} />
        <Route path="/macroNutrients" element={<MacroNutrientPage />} />
        <Route path="/progressRecords" element={<ProgressRecordPage />} />
        </Routes>
      </main>
    </div>
  );
}
