import { useEffect, useState } from "react";
import api from "../lib/api";

export default function ExercisePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    api
      .get("/exercises")
      .then(({ data }) => mounted && setItems(data))
      .catch((err) => mounted && setError(err.response?.data?.error || "Failed to load"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p className="text-gray-500">Loading exercises...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Exercises</h1>
      {items.length === 0 ? (
        <p className="text-gray-500">No exercises yet.</p>
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
