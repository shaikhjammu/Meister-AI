export function packageJson(appSlug) {
  return JSON.stringify(
    {
      name: `${appSlug}-frontend`,
      version: "1.0.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview",
      },
      dependencies: {
        react: "^18.3.1",
        "react-dom": "^18.3.1",
        "react-router-dom": "^6.24.0",
        axios: "^1.7.2",
      },
      devDependencies: {
        vite: "^5.3.1",
        "@vitejs/plugin-react": "^4.3.1",
        tailwindcss: "^3.4.4",
        autoprefixer: "^10.4.19",
        postcss: "^8.4.38",
        typescript: "^5.5.2",
      },
    },
    null,
    2
  );
}

export function viteConfig() {
  return `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
`;
}

export function tailwindConfig() {
  return `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
`;
}

export function indexHtml(appType) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${appType}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;
}

export function mainJsx() {
  return `import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
`;
}

export function indexCss() {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;
`;
}

export function apiClient() {
  return `import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

export default api;
`;
}

export function appJsx(appType, entities) {
  const imports = entities
    .map((e) => `import ${e}Page from "./pages/${e}Page.jsx";`)
    .join("\n");
  const routes = entities
    .map((e) => `        <Route path="/${lower(e)}s" element={<${e}Page />} />`)
    .join("\n");
  const navLinks = entities
    .map((e) => `          <Link to="/${lower(e)}s" className="hover:text-blue-600">${e}s</Link>`)
    .join("\n");

  return `import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
${imports}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex gap-6 items-center">
        <span className="font-bold text-lg text-gray-800">${appType}</span>
        <Link to="/" className="hover:text-blue-600">Dashboard</Link>
${navLinks}
        <Link to="/login" className="ml-auto hover:text-blue-600">Login</Link>
      </nav>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
${routes}
        </Routes>
      </main>
    </div>
  );
}
`;
}

export function loginPage() {
  return `import { useState } from "react";
import api from "../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border rounded-lg px-3 py-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border rounded-lg px-3 py-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-lg py-2 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
`;
}

export function dashboardPage(appType, features) {
  const featureCards = features
    .map(
      (f) => `        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">${f}</p>
        </div>`
    )
    .join("\n");

  return `export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">${appType} Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
${featureCards}
      </div>
    </div>
  );
}
`;
}

export function entityPage(entity) {
  const varName = lower(entity);
  return `import { useEffect, useState } from "react";
import api from "../lib/api";

export default function ${entity}Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    api
      .get("/${varName}s")
      .then(({ data }) => mounted && setItems(data))
      .catch((err) => mounted && setError(err.response?.data?.error || "Failed to load"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p className="text-gray-500">Loading ${varName}s...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">${entity}s</h1>
      {items.length === 0 ? (
        <p className="text-gray-500">No ${varName}s yet.</p>
      ) : (
        <div className="bg-white rounded-xl shadow divide-y">
          {items.map((item) => (
            <div key={item._id} className="p-4">
              <pre className="text-sm text-gray-700">{JSON.stringify(item, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
`;
}

function lower(s) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
