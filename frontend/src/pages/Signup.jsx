import React, {useState} from "react";
import { signup } from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Signup(){
  const [form, setForm] = useState({username:"", email:"", password:""});
  const [msg, setMsg] = useState("");
  const nav = useNavigate();
  const submit = async (e)=>{
    e.preventDefault();
    try{
      await signup(form);
      setMsg("Signup success — please login.");
      nav("/login");
    }catch(err){ setMsg(err?.response?.data?.detail || "error"); }
  };
  return (
    <>
      <Navbar />
      <div className="px-6 py-12 md:py-20 flex justify-center items-center">
        <div className="glass-panel w-full max-w-md rounded-3xl border border-slate-800/60 p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <h2 className="text-3xl font-extrabold text-white mb-2 text-center tracking-tight">Create Account</h2>
          <p className="text-slate-400 text-sm text-center mb-8">Register to start predicting stock market pricing</p>
          
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="text-xs text-slate-400 font-bold tracking-wider block mb-1.5 uppercase">USERNAME</label>
              <input 
                required 
                placeholder="Choose username" 
                value={form.username} 
                onChange={e=>setForm({...form, username:e.target.value})} 
                className="w-full px-4 py-3 glass-input rounded-xl focus:outline-none text-white placeholder-slate-500" 
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-bold tracking-wider block mb-1.5 uppercase">EMAIL ADDRESS</label>
              <input 
                required 
                type="email" 
                placeholder="you@example.com" 
                value={form.email} 
                onChange={e=>setForm({...form, email:e.target.value})} 
                className="w-full px-4 py-3 glass-input rounded-xl focus:outline-none text-white placeholder-slate-500" 
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-bold tracking-wider block mb-1.5 uppercase">PASSWORD</label>
              <input 
                required 
                type="password" 
                placeholder="••••••••" 
                value={form.password} 
                onChange={e=>setForm({...form, password:e.target.value})} 
                className="w-full px-4 py-3 glass-input rounded-xl focus:outline-none text-white placeholder-slate-500" 
              />
            </div>
            <button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold py-3 rounded-xl w-full transition-all duration-300 active:scale-[0.98] shadow-lg shadow-indigo-600/15">
              Sign Up
            </button>
          </form>
          {msg && <p className="mt-4 text-sm text-indigo-300 text-center font-medium">{msg}</p>}
        </div>
      </div>
    </>
  );
}

