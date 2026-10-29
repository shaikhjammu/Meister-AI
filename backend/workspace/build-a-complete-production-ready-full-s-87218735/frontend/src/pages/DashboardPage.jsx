export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Kanban Task & Project Management System Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Interactive Kanban Drag & Status Boards</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Project Workspaces & Sprint Milestones</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Task Assignee & Priority Controls</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Comment Threads & File Attachments</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Real-Time Team Activity Logs</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Project Completion Metrics Dashboard</p>
        </div>
      </div>
    </div>
  );
}
