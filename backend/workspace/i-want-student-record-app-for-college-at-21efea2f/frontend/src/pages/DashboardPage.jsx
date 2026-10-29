export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">School & Student Portal System Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Student, Teacher, and Parent Portals</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Daily Student Attendance & Leave Tracker</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Exam Results & GPA Report Card Generator</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Interactive Class Timetable & Schedule</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Fee Payment & Outstanding Dues Overview</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">School Announcement & Notice Board</p>
        </div>
      </div>
    </div>
  );
}
