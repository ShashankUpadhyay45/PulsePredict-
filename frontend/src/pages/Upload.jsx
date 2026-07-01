import React, {useState} from "react";
import Navbar from "../components/Navbar";
import { uploadCSV } from "../api";

export default function Upload(){
  const [file,setFile]=useState(null);
  const [resp,setResp]=useState(null);
  const submit = async (e)=>{
    e.preventDefault();
    if(!file) return;
    const fd = new FormData();
    fd.append("file", file);
    try{
      const r = await uploadCSV(fd);
      setResp(r.data.items || r.data);
    }catch(e){
      setResp({error: e?.response?.data || "error"});
    }
  };
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="glass-panel rounded-3xl border border-slate-800/60 shadow-2xl p-8 mb-10 max-w-xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Bulk Upload Forecasts</h2>
          <p className="text-sm text-slate-400 mb-6">
            Provide a CSV file with a column of tickers (e.g. <code className="bg-slate-950 px-2 py-0.5 rounded text-indigo-300 font-semibold border border-indigo-500/10">ticker</code>) to batch generate ML models and log them.
          </p>
          
          <form onSubmit={submit} className="space-y-6">
            <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-colors flex items-center justify-center bg-slate-950/10">
              <input 
                required
                type="file" 
                accept=".csv" 
                onChange={e=>setFile(e.target.files[0])} 
                className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 file:transition-all cursor-pointer focus:outline-none" 
              />
            </div>
            
            <button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold py-3 rounded-xl w-full transition-all duration-300 active:scale-[0.98] shadow-lg shadow-indigo-600/15">
              Process Bulk File
            </button>
          </form>
        </div>

        {resp && (
          <div className="max-w-2xl mx-auto mt-8 animate-fade-in">
            <h3 className="font-extrabold text-white text-lg mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Execution Output
            </h3>
            <pre className="bg-slate-950/60 p-5 border border-slate-800/80 rounded-2xl text-xs text-slate-300 overflow-x-auto shadow-2xl font-mono leading-relaxed">
              {JSON.stringify(resp, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </>
  );
}
