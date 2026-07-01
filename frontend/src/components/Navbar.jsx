import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar(){
  const navigate = useNavigate();
  const location = useLocation();
  
  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };
  
  const logged = Boolean(localStorage.getItem("access_token"));
  
  const linkClass = (path) => {
    const active = location.pathname === path;
    return `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 tracking-wide ${
      active 
        ? "text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]" 
        : "text-slate-400 hover:text-white hover:bg-slate-800/40"
    }`;
  };

  return (
    <div className="sticky top-0 z-50 w-full px-6 pt-4">
      <nav className="max-w-7xl mx-auto backdrop-blur-lg bg-slate-950/60 border border-slate-800/80 rounded-2xl px-6 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex justify-between items-center transition-all duration-300">
        <div>
          <Link to="/" className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent flex items-center gap-2 hover:scale-[1.02] transition-transform duration-300">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.9)] animate-pulse"></span>
            PulsePredict
          </Link>
        </div>
        <div className="flex items-center gap-1.5">
          <Link to="/" className={linkClass("/")}>Home</Link>
          {logged ? (
            <>
              <Link to="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
              <Link to="/upload" className={linkClass("/upload")}>Upload</Link>
              <Link to="/history" className={linkClass("/history")}>History</Link>
              <button 
                onClick={logout} 
                className="ml-2 px-3.5 py-2 text-sm font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all duration-300 active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkClass("/login")}>Login</Link>
              <Link to="/signup" className={linkClass("/signup")}>Signup</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}



