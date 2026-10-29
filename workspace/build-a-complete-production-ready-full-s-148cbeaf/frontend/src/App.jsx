import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import VoiceCommandPage from "./pages/VoiceCommandPage.jsx";
import FileOrganizerPage from "./pages/FileOrganizerPage.jsx";
import EmailSummaryPage from "./pages/EmailSummaryPage.jsx";
import CodeSnippetPage from "./pages/CodeSnippetPage.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex gap-6 items-center">
        <span className="font-bold text-lg text-gray-800">AI Operating System & Voice Assistant</span>
        <Link to="/" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/voiceCommands" className="hover:text-blue-600">VoiceCommands</Link>
          <Link to="/fileOrganizers" className="hover:text-blue-600">FileOrganizers</Link>
          <Link to="/emailSummarys" className="hover:text-blue-600">EmailSummarys</Link>
          <Link to="/codeSnippets" className="hover:text-blue-600">CodeSnippets</Link>
        <Link to="/login" className="ml-auto hover:text-blue-600">Login</Link>
      </nav>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
        <Route path="/voiceCommands" element={<VoiceCommandPage />} />
        <Route path="/fileOrganizers" element={<FileOrganizerPage />} />
        <Route path="/emailSummarys" element={<EmailSummaryPage />} />
        <Route path="/codeSnippets" element={<CodeSnippetPage />} />
        </Routes>
      </main>
    </div>
  );
}
