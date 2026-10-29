import { useState } from "react";

export default function ProfileModal({ user, onClose, onSave }) {
  const [name, setName] = useState(user?.name || "Senior Developer");
  const [mobile, setMobile] = useState(user?.mobile || "+91 9876543210");
  const [email, setEmail] = useState(user?.email || "developer@meisterai.com");
  const [role, setRole] = useState(user?.role || "Lead Software Engineer");
  const [saved, setSaved] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const updated = { ...user, name, mobile, email, role };
    localStorage.setItem("meisterai_user_profile", JSON.stringify(updated));
    onSave(updated);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0E0610]/85 backdrop-blur-md flex items-center justify-center p-4 font-sans">
      <div className="glass-panel-pink border border-[#F472B6]/40 rounded-3xl max-w-md w-full p-7 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F472B6]/20 pb-4">
          <div className="flex items-center space-x-3">
            <div className="circular-btn w-12 h-12 bg-gradient-to-tr from-[#EC4899] via-[#F472B6] to-[#FDE68A] text-[#120814] font-extrabold text-xl shadow-md border border-[#FFF9F2]/50">
              👤
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#FFF9F2] flex items-center gap-2">
                User Profile Settings
              </h2>
              <p className="text-xs text-[#E8B8CD]">Manage your MeisterAI account & developer details</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#E8B8CD] hover:text-[#FFF9F2] text-lg px-2.5 py-1 rounded-xl hover:bg-[#2B142A] transition"
          >
            ✕
          </button>
        </div>

        {saved && (
          <div className="bg-[#FDE68A]/20 border border-[#FDE68A]/40 text-[#FDE68A] text-xs p-3 rounded-2xl text-center font-bold animate-pulse">
            ✓ Profile details updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#FFF9F2] mb-1.5 block">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#180A1A] border border-[#F472B6]/30 rounded-2xl px-4 py-2.5 text-xs text-[#FFF5F8] focus:outline-none focus:border-[#EC4899] focus:ring-2 focus:ring-[#EC4899]/40 font-medium transition"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#FFF9F2] mb-1.5 block">
              Mobile Number
            </label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full bg-[#180A1A] border border-[#F472B6]/30 rounded-2xl px-4 py-2.5 text-xs text-[#FFF5F8] font-mono focus:outline-none focus:border-[#EC4899] focus:ring-2 focus:ring-[#EC4899]/40 transition"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#FFF9F2] mb-1.5 block">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#180A1A] border border-[#F472B6]/30 rounded-2xl px-4 py-2.5 text-xs text-[#FFF5F8] focus:outline-none focus:border-[#EC4899] focus:ring-2 focus:ring-[#EC4899]/40 font-medium transition"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#FFF9F2] mb-1.5 block">
              Developer Role / Title
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#180A1A] border border-[#F472B6]/30 rounded-2xl px-4 py-2.5 text-xs text-[#FFF5F8] focus:outline-none focus:border-[#EC4899] focus:ring-2 focus:ring-[#EC4899]/40 font-medium transition"
            />
          </div>

          <div className="pt-3 border-t border-[#F472B6]/20 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#2B142A] hover:bg-[#3D1A3B] text-[#FFF9F2] text-xs px-4 py-2.5 rounded-2xl border border-[#F472B6]/30 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-pink-gradient font-bold text-xs px-6 py-2.5 rounded-2xl shadow-lg shadow-pink-500/25 transition cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
