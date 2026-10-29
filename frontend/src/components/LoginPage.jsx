import { useState } from "react";
import logoUrl from "../../ChatGPT Image Aug 26, 2026, 05_01_03 PM.png";

export default function LoginPage({ onLoginSuccess }) {
  const [mobile, setMobile] = useState("+91 9876543210");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Mobile input, 2: OTP input
  const [error, setError] = useState("");
  const DEMO_OTP = "123456";

  function handleSendOtp(e) {
    e.preventDefault();
    if (!mobile.trim() || mobile.trim().length < 8) {
      setError("Please enter a valid mobile number.");
      return;
    }
    setError("");
    setStep(2);
  }

  function handleVerifyOtp(e) {
    e.preventDefault();
    if (otp.trim() !== DEMO_OTP) {
      setError(`Invalid OTP. Use Demo OTP: ${DEMO_OTP}`);
      return;
    }
    setError("");
    onLoginSuccess({
      mobile,
      name: "Senior Developer",
      email: "developer@meisterai.com",
      role: "Lead Software Engineer",
    });
  }

  function handleQuickLogin() {
    setMobile("+91 9876543210");
    setOtp(DEMO_OTP);
    onLoginSuccess({
      mobile: "+91 9876543210",
      name: "Demo User",
      email: "demo@meisterai.com",
      role: "Full-Stack Engineer",
    });
  }

  return (
    <div className="login-glass-page min-h-screen flex flex-col justify-between relative overflow-hidden font-sans">
      <div className="bubble-field" aria-hidden="true">
        {[...Array(12)].map((_, index) => (
          <span
            key={index}
            className="bubble"
            style={{
              "--bubble-left": `${(index * 29 + 4) % 96}%`,
              "--bubble-size": `${22 + (index % 5) * 13}px`,
              "--bubble-delay": `${(index % 6) * -2}s`,
              "--bubble-duration": `${14 + (index % 5) * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Dynamic Animated Glass Glow Spheres */}
      <div className="login-glass-orb login-glass-orb-one absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-[160px] pointer-events-none animate-pulse" />
      <div className="login-glass-orb login-glass-orb-two absolute bottom-10 right-10 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none" />
      <div className="login-glass-orb login-glass-orb-three absolute top-10 left-10 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none" />

      {/* Top Floating Glass Banner */}
      <div className="login-glass-banner w-full py-2.5 px-4 text-center sticky top-0 z-50">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FFF9F2]">
          <span className="animate-pulse">🔑</span>
          <span className="text-[#FDE68A]">MEISTERAI TESTING CREDENTIALS:</span>
          <span className="bg-[#EC4899]/30 text-[#FFF9F2] px-3 py-0.5 rounded-full font-mono border border-[#F472B6]/40 shadow-sm backdrop-blur-md">
            OTP: 123456
          </span>
          <span className="text-[#E8B8CD] font-normal hidden sm:inline">(Use any mobile number)</span>
        </div>
      </div>

      {/* Main Transparent Glass Login Form Box */}
      <div className="flex-1 flex items-center justify-center p-6 z-10">
        <div className="login-glass-panel login-glass-zoom w-full max-w-md rounded-3xl p-8 shadow-2xl space-y-6 relative transition duration-500">
          
          {/* Glowing Translucent Accent Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#F472B6] to-transparent shadow-lg shadow-[#EC4899]" />

          {/* Logo & Header */}
          <div className="text-center space-y-2.5">
            <img
              src={logoUrl}
              alt="MeisterAI logo"
              className="w-16 h-16 rounded-full object-cover mx-auto shadow-2xl shadow-pink-500/40 border-2 border-white/60 backdrop-blur-sm transform hover:scale-105 transition duration-300"
            />
            <h1 className="text-3xl font-extrabold text-[#FFF9F2] tracking-tight">
              <span className="text-fent-mixup">MeisterAI Workspace</span>
            </h1>
            <p className="text-xs text-[#E8B8CD] max-w-xs mx-auto font-medium">
              Autonomous AI Engineering Platform · Ultra-Glassmorphism Portal
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-200 text-xs p-3 rounded-2xl text-center font-medium backdrop-blur-md">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#FFF9F2] mb-1.5 block tracking-wide">
                  Mobile Number
                </label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full glass-input-transparent rounded-2xl px-4 py-3 text-sm font-mono shadow-inner focus:outline-none placeholder-[#E8B8CD]/40"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-pink-gradient py-3.5 rounded-2xl text-sm font-extrabold shadow-xl shadow-pink-500/30 flex items-center justify-center gap-2 transform active:scale-95 transition"
              >
                <span>Get Verification OTP</span>
                <span>→</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#FFF9F2] tracking-wide">
                    Enter Verification OTP
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[11px] text-[#FDE68A] hover:underline"
                  >
                    Change Number
                  </button>
                </div>

                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="w-full glass-input-transparent rounded-2xl px-4 py-3 text-center text-xl tracking-widest font-mono text-[#FDE68A] placeholder-[#E8B8CD]/30 focus:outline-none shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-pink-gradient py-3.5 rounded-2xl text-sm font-extrabold shadow-xl shadow-pink-500/30 flex items-center justify-center gap-2 transform active:scale-95 transition"
              >
                <span>Verify OTP & Launch MeisterAI</span>
                <span>✓</span>
              </button>
            </form>
          )}

          {/* Quick One-Click Demo Access Button */}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={handleQuickLogin}
              className="login-glass-secondary w-full font-semibold text-xs rounded-2xl py-3 transition flex items-center justify-center gap-2 shadow-md"
            >
              <span>⚡ One-Click Demo Access (Skip Login)</span>
            </button>
          </div>

          <div className="text-center text-[11px] text-[#E8B8CD]/80 font-mono">
            MeisterAI Autonomous Software Platform · Glassmorphic Interface
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="text-center py-4 text-xs text-[#E8B8CD]/60 border-t border-white/10 z-10 backdrop-blur-sm">
        © 2026 MeisterAI — Autonomous AI Engineering Workspace.
      </div>
    </div>
  );
}

