import React, {useState} from "react";
import Navbar from "../components/Navbar";
import { predict } from "../api";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";


export default function Dashboard(){
  const [input, setInput] = useState("");
  const [res, setRes] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  
  const submit = async (e)=>{
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setRes(null);
    setErr("");
    try{
      const r = await predict({ input });
      setRes(r.data);
    }catch(e){ 
      setErr("Error calling API. Please check your connection."); 
    } finally {
      setLoading(false);
    }
  };

  const formatVolume = (v) => {
    if (!v) return "-";
    return v >= 1e6 ? (v / 1e6).toFixed(2) + "M" : v.toLocaleString();
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="glass-panel rounded-3xl border border-slate-800/60 shadow-2xl p-8 mb-10 max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Stock Prediction Center</h2>
          <p className="text-sm text-slate-400 mb-6">
            Search any global stock ticker (e.g., <code className="bg-slate-900 px-2 py-0.5 rounded text-indigo-300 font-semibold border border-indigo-500/10">AAPL</code>, <code className="bg-slate-900 px-2 py-0.5 rounded text-indigo-300 font-semibold border border-indigo-500/10">SBIN.NS</code>) to retrieve metrics and train our model.
          </p>
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
            <input 
              value={input} 
              disabled={loading} 
              onChange={e=>setInput(e.target.value)} 
              placeholder="e.g., TSLA or RELIANCE.NS" 
              className="flex-1 px-4 py-3 glass-input rounded-xl focus:outline-none text-white placeholder-slate-500 disabled:opacity-50" 
            />
            <button 
              disabled={loading} 
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/15 disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? "Calculating..." : "Forecast"}
            </button>
          </form>
          {err && <p className="text-red-400 text-sm mt-3 font-medium flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>{err}</p>}
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-indigo-300 text-sm mt-4 font-semibold tracking-wider">TRAINING TIME-SERIES REGRESSION MODEL...</p>
          </div>
        )}

        {res && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* Chart Area */}
            <div className="lg:col-span-2 glass-panel rounded-3xl border border-slate-800/60 shadow-2xl p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-extrabold text-white text-xl tracking-tight">Historical Pricing</h3>
                  <p className="text-xs text-slate-400 mt-1">30-day closing prices with forecasted target</p>
                </div>
                {res.numeric && (
                  <div className="text-right">
                    <span className="text-[10px] text-indigo-400 font-bold tracking-widest block mb-0.5 uppercase">FORECAST TARGET</span>
                    <span className="text-3xl font-extrabold text-emerald-400 tracking-tight shadow-emerald-500/10">
                      {res.latest_data?.currency || "$"}{res.numeric.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
              
              {res.historical && res.historical.length > 0 ? (
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={res.historical} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#818cf8" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                      <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0b0f19", border: "1px solid #1e293b", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)" }}
                        labelClassName="text-indigo-400 font-bold text-xs"
                        itemStyle={{ color: "#fff" }}
                      />
                      <Area type="monotone" dataKey="close" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorClose)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-96 flex items-center justify-center bg-slate-950/40 rounded-2xl border border-slate-800/40">
                  <p className="text-slate-500 text-sm">No historical data available</p>
                </div>
              )}
            </div>

            {/* Stats Area */}
            <div className="glass-panel rounded-3xl border border-slate-800/60 shadow-2xl p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-white text-xl tracking-tight mb-5">Stock Overview</h3>
                <div className="bg-slate-950/40 border border-slate-800/50 rounded-2xl p-5 mb-8">
                  <span className="text-[10px] text-indigo-400 font-bold tracking-widest block mb-2 uppercase">PREDICTION OVERVIEW</span>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed">{res.prediction}</p>
                </div>
                
                {res.latest_data && (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="border border-slate-800/40 bg-slate-950/20 rounded-2xl p-4 transition-all hover:bg-slate-950/40">
                      <span className="text-[10px] text-slate-500 font-bold tracking-wider block mb-1.5 uppercase">OPEN</span>
                      <span className="text-2xl font-extrabold text-slate-200 tracking-tight">
                        {res.latest_data.currency}{res.latest_data.open.toFixed(2)}
                      </span>
                    </div>
                    <div className="border border-slate-800/40 bg-slate-950/20 rounded-2xl p-4 transition-all hover:bg-slate-950/40">
                      <span className="text-[10px] text-slate-500 font-bold tracking-wider block mb-1.5 uppercase">VOLUME</span>
                      <span className="text-2xl font-extrabold text-slate-200 tracking-tight font-sans">
                        {formatVolume(res.latest_data.volume)}
                      </span>
                    </div>
                    <div className="border border-slate-800/40 bg-slate-950/20 rounded-2xl p-4 transition-all hover:bg-slate-950/40">
                      <span className="text-[10px] text-slate-500 font-bold tracking-wider block mb-1.5 uppercase">TODAY'S HIGH</span>
                      <span className="text-2xl font-extrabold text-emerald-400 tracking-tight">
                        {res.latest_data.currency}{res.latest_data.high.toFixed(2)}
                      </span>
                    </div>
                    <div className="border border-slate-800/40 bg-slate-950/20 rounded-2xl p-4 transition-all hover:bg-slate-950/40">
                      <span className="text-[10px] text-slate-500 font-bold tracking-wider block mb-1.5 uppercase">TODAY'S LOW</span>
                      <span className="text-2xl font-extrabold text-rose-400 tracking-tight">
                        {res.latest_data.currency}{res.latest_data.low.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 pt-5 border-t border-slate-800/60">
                <p className="text-xs text-slate-500 text-center font-medium leading-relaxed">
                  Linear Regression model trained dynamically on 2 years of daily close data.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>


    </>
  );
}


