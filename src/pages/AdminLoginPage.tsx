import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff, Sparkles, AlertCircle, Lock, User } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  // Already authenticated → go straight to dashboard
  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const ok = login(username.trim(), password);
      setLoading(false);
      if (ok) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError('Invalid username or password. Please try again.');
        setShake(true);
        setTimeout(() => setShake(false), 600);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background glow blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-party-purple-700/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-party-pink-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className={`relative z-10 w-full max-w-md transition-all duration-300 ${shake ? 'animate-[shake_0.3s_ease-in-out_2]' : ''}`}>

        {/* Card */}
        <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 space-y-7">

          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-party-purple-600 via-party-pink-500 to-party-gold-400 flex items-center justify-center shadow-lg shadow-party-purple-500/40">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-2">
                Admin Portal
                <Sparkles className="w-4 h-4 text-party-gold-400 animate-pulse" />
              </h1>
              <p className="text-slate-400 text-sm mt-1">BdayBuzz — Business Dashboard</p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-2xl text-sm animate-fadeIn">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-1.5">
              <label htmlFor="admin-username" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="admin-username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-party-purple-500 focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-party-purple-500 focus:border-transparent transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="admin-login-submit"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-party-purple-600 via-party-pink-500 to-party-purple-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-party-purple-500/30 hover:shadow-glow hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Sign In to Admin
                </>
              )}
            </button>
          </form>

          {/* Back to site */}
          <div className="text-center pt-1">
            <a
              href="/"
              className="text-xs text-slate-500 hover:text-party-purple-400 transition"
            >
              ← Back to BdayBuzz website
            </a>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-600 mt-5">
          This portal is for authorised BdayBuzz staff only.
        </p>
      </div>
    </div>
  );
};
