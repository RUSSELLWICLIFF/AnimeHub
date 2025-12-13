import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!agreeTerms) {
      setError("Please agree to terms and conditions");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1a3e] to-[#0d0d2d] overflow-hidden p-5">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-96 h-96 bg-red-500 rounded-full filter blur-3xl opacity-10 top-[10%] right-[10%] animate-float"></div>
        <div className="absolute w-72 h-72 bg-red-700 rounded-full filter blur-3xl opacity-10 bottom-[20%] left-[5%] animate-float" style={{ animationDelay: "3s" }}></div>
        <div className="absolute w-80 h-80 bg-red-400 rounded-full filter blur-3xl opacity-10 top-[50%] right-[5%] animate-float" style={{ animationDelay: "6s" }}></div>
      </div>

      <div className="bg-[#0f0f1e]/95 backdrop-blur-2xl border border-[#ff4d4d]/25 rounded-3xl p-16 w-full max-w-md shadow-2xl shadow-black/60 z-10 animate-slideUp">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4 animate-bounce">🎌</div>
          <h1 className="text-4xl font-black text-[#ff4d4d] mb-2 drop-shadow-lg">Create Account</h1>
          <p className="text-gray-400 text-xs tracking-widest uppercase font-semibold">Join AnimeHub Community</p>
        </div>

        {error && (
          <div className="bg-[#ff4d4d]/15 border border-[#ff4d4d]/50 text-[#ff9999] p-3 rounded-2xl mb-5 text-xs animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label htmlFor="email" className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-2 block">Email Address</label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-lg">✉️</span>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-[#ff4d4d]/25 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-[#ff4d4d] focus:bg-[#ff4d4d]/10 focus:shadow-lg focus:shadow-[#ff4d4d]/25 focus:-translate-y-0.5 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-2 block">Password</label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-lg">🔒</span>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-[#ff4d4d]/25 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-[#ff4d4d] focus:bg-[#ff4d4d]/10 focus:shadow-lg focus:shadow-[#ff4d4d]/25 focus:-translate-y-0.5 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-2 block">Confirm Password</label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-lg">🔒</span>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-[#ff4d4d]/25 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-[#ff4d4d] focus:bg-[#ff4d4d]/10 focus:shadow-lg focus:shadow-[#ff4d4d]/25 focus:-translate-y-0.5 transition-all"
                required
              />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer text-gray-400 text-xs hover:text-gray-300 transition-colors">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="accent-[#ff4d4d]"
              required
            />
            <span>I agree to Terms & Conditions</span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] text-white font-bold uppercase tracking-wider rounded-2xl mt-6 shadow-lg shadow-[#ff4d4d]/40 hover:shadow-[#ff4d4d]/60 hover:-translate-y-1 disabled:opacity-80 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#ff4d4d]/10 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account? <Link to="/login" className="text-[#ff4d4d] font-bold hover:text-[#ffaaaa] transition-colors">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
