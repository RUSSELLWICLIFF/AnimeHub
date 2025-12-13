import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/");
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
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1a3e] to-[#0d0d2d] overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-96 h-96 bg-red-500 rounded-full filter blur-3xl opacity-10 top-[10%] right-[10%] animate-float"></div>
        <div className="absolute w-72 h-72 bg-red-700 rounded-full filter blur-3xl opacity-10 bottom-[20%] left-[5%] animate-float" style={{ animationDelay: "3s" }}></div>
        <div className="absolute w-80 h-80 bg-red-400 rounded-full filter blur-3xl opacity-10 top-[50%] right-[5%] animate-float" style={{ animationDelay: "6s" }}></div>
      </div>

      <div className="bg-[#0f0f1e]/95 backdrop-blur-2xl border border-[#ff4d4d]/25 rounded-3xl p-16 w-full max-w-md shadow-2xl shadow-black/60 z-10 animate-slideUp">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4 animate-bounce">🎌</div>
          <h1 className="text-4xl font-black text-[#ff4d4d] mb-2 drop-shadow-lg">AnimeHub</h1>
          <p className="text-gray-400 text-xs tracking-widest uppercase font-semibold">Welcome Back</p>
        </div>

        {error && (
          <div className="bg-[#ff4d4d]/15 border border-[#ff4d4d]/50 text-[#ff9999] p-3 rounded-2xl mb-5 text-xs animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
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
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-[#ff4d4d]/25 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-[#ff4d4d] focus:bg-[#ff4d4d]/10 focus:shadow-lg focus:shadow-[#ff4d4d]/25 focus:-translate-y-0.5 transition-all"
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
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-[#ff4d4d]/25 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-[#ff4d4d] focus:bg-[#ff4d4d]/10 focus:shadow-lg focus:shadow-[#ff4d4d]/25 focus:-translate-y-0.5 transition-all"
                required
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 cursor-pointer text-gray-400 text-xs hover:text-gray-300 transition-colors">
              <input type="checkbox" className="accent-[#ff4d4d]" />
              <span>Remember me</span>
            </label>
            <Link to="/" className="text-[#ff8888] text-xs font-bold hover:text-[#ffaaaa] underline transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] text-white font-bold uppercase tracking-wider rounded-2xl mt-6 shadow-lg shadow-[#ff4d4d]/40 hover:shadow-[#ff4d4d]/60 hover:-translate-y-1 disabled:opacity-80 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#ff4d4d]/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-[#0f0f1e]/95 text-gray-500 font-bold uppercase tracking-wider">OR</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="py-3 bg-white/5 border border-[#ff4d4d]/20 rounded-xl text-gray-300 text-sm font-bold hover:bg-[#ff4d4d]/10 hover:border-[#ff4d4d]/40 transition-all">
            Google
          </button>
          <button type="button" className="py-3 bg-white/5 border border-[#ff4d4d]/20 rounded-xl text-gray-300 text-sm font-bold hover:bg-[#ff4d4d]/10 hover:border-[#ff4d4d]/40 transition-all">
            Discord
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-[#ff4d4d]/10 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account? <Link to="/signup" className="text-[#ff4d4d] font-bold hover:text-[#ffaaaa] transition-colors">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
