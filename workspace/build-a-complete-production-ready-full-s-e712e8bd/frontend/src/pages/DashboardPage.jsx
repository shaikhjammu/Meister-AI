export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Fitness & Nutrition Tracker App Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Interactive Workout Routine Logger</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Exercise Video & Instructions Library</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Daily Calorie & Macro Tracker</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Body Progress & Weight Analytics</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Trainer Client Coaching Console</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Fitness Goal Milestone Badges</p>
        </div>
      </div>
    </div>
  );
}
