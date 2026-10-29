export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Hospital Management System Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Admin, Doctor & Patient Login Portal</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Interactive Doctor Appointment Scheduling</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Patient Medical Records & Clinical History</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Digital Prescription & Diagnosis Generator</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Department & Room Inventory Tracking</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Feature</p>
          <p className="font-medium">Billing & Invoice Status Overview</p>
        </div>
      </div>
    </div>
  );
}
