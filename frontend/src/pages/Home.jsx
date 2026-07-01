import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  const logged = Boolean(localStorage.getItem("access_token"));

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-20 animate-fade-in">
          <span className="bg-indigo-500/10 text-indigo-300 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-indigo-500/20 uppercase tracking-widest">
            Machine Learning Platform
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-6 mb-6 leading-tight tracking-tight">
            Predict Global Stock Trends with <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">PulsePredict</span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 mb-10 leading-relaxed max-w-xl mx-auto">
            A professional forecasting engine powered by Scikit-Learn linear regression models, real-time yfinance stock feeds, and local caching databases.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to={logged ? "/dashboard" : "/login"} 
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all"
            >
              Get Started
            </Link>
            <a 
              href="#developer" 
              className="glass-card hover:bg-slate-900/60 text-slate-200 font-semibold px-6 py-3.5 rounded-xl border border-slate-800 transition-all"
            >
              Developer Profile
            </a>
          </div>
        </div>

        {/* Application Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="glass-card rounded-2xl p-6 shadow-xl hover:border-slate-700/50 transition-all duration-300 group">
            <div className="text-3xl font-extrabold text-indigo-400 mb-2 group-hover:scale-105 transition-transform origin-left">&lt; 150ms</div>
            <h3 className="font-bold text-slate-200 text-base mb-1">Fast Predictions</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Cached machine learning models serialize to SQLite database storage for near-instant client-side loading times.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 shadow-xl hover:border-slate-700/50 transition-all duration-300 group">
            <div className="text-3xl font-extrabold text-indigo-400 mb-2 group-hover:scale-105 transition-transform origin-left">yfinance</div>
            <h3 className="font-bold text-slate-200 text-base mb-1">Real-Time Data</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Integrates with global stock market exchanges (NSE, BSE, NASDAQ, LSE) to fetch live closing price history.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 shadow-xl hover:border-slate-700/50 transition-all duration-300 group">
            <div className="text-3xl font-extrabold text-indigo-400 mb-2 group-hover:scale-105 transition-transform origin-left">94% +</div>
            <h3 className="font-bold text-slate-200 text-base mb-1">Regression Models</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Utilizes Scikit-Learn's sequential time-series regression algorithms with standard model error tracking (RMSE).
            </p>
          </div>
        </div>

        {/* Developer Spotlight Card */}
        <div id="developer" className="glass-panel rounded-3xl text-white p-8 md:p-12 shadow-2xl relative overflow-hidden border border-slate-800/80">
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-indigo-500 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Avatar Placeholder */}
            <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-slate-900 shadow-[0_0_20px_rgba(99,102,241,0.3)] shrink-0">
              SU
            </div>
            
            {/* Developer Details */}
            <div className="flex-1 text-center md:text-left">
              <span className="text-xs text-indigo-400 font-extrabold tracking-widest uppercase">
                MEET THE DEVELOPER
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold mt-1 mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Shashank Upadhyay
              </h2>
              <p className="text-indigo-300 font-semibold text-sm mb-4">Full Stack Software & Machine Learning Engineer</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xl">
                Passionate developer specializing in building premium user experiences, robust microservices, and practical machine learning solutions. Creator of SpendSage, Weather PWA, and PlayPulse.
              </p>
              
              {/* Tech Stack Badges */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                {["React", "FastAPI", "Python", "SQLAlchemy", "Tailwind CSS", "Scikit-Learn"].map((tech) => (
                  <span key={tech} className="bg-slate-900/80 text-slate-300 text-xs px-2.5 py-1 rounded-md font-semibold border border-slate-800">
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a 
                  href="mailto:theshashankupa8127@gmail.com" 
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-lg shadow-indigo-600/10"
                >
                  Contact Email
                </a>
                <a 
                  href="https://github.com/ShashankUpadhyay45" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold px-4 py-2.5 rounded-lg border border-slate-800 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}

