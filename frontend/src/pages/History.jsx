import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import { history } from "../api";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function History(){
  const [items,setItems] = useState([]);
  
  useEffect(()=>{ 
    (async()=>{
      try{ 
        const r = await history(); 
        setItems(r.data.items); 
      } catch(e){ 
        setItems([]); 
      }
    })() 
  }, []);

  const chartData = items
    .filter(it=>it.numeric_result!==null)
    .map(it=>({
      x: new Date(it.created_at).toLocaleDateString(), 
      y: it.numeric_result,
      ticker: it.input_text
    }));

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* History List */}
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-white mb-6 tracking-tight">Search History</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
              {items.length > 0 ? (
                items.map(it=>(
                  <div key={it.id} className="glass-card rounded-2xl border border-slate-800/40 p-5 shadow-lg hover:border-slate-700/40 transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-indigo-400 font-bold bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/10">
                        {it.input_text.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {new Date(it.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 font-medium mb-3">{it.result_text}</p>
                    {it.numeric_result!==null && (
                      <div className="text-xs text-slate-500 font-semibold">
                        NUMERIC TARGET: <span className="text-emerald-400 font-extrabold">{it.numeric_result.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="glass-card rounded-2xl border border-slate-800/40 p-8 text-center">
                  <p className="text-slate-500 text-sm">No search logs found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Chart Panel */}
          {chartData.length > 0 && (
            <div className="lg:w-1/2 glass-panel rounded-3xl border border-slate-800/60 p-8 shadow-2xl flex flex-col justify-between self-start">
              <div>
                <h3 className="font-extrabold text-white text-xl tracking-tight mb-1">Predictions Time-series</h3>
                <p className="text-xs text-slate-400 mb-6">Chronological visualization of forecast targets</p>
                
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                      <XAxis dataKey="x" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0b0f19", border: "1px solid #1e293b", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)" }}
                        labelClassName="text-indigo-400 font-bold text-xs"
                        itemStyle={{ color: "#fff" }}
                      />
                      <Line type="monotone" dataKey="y" stroke="#818cf8" strokeWidth={3} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-slate-800/60">
                <p className="text-[10px] text-slate-500 text-center font-medium uppercase tracking-wider">
                  Aggregating all historical predictions recorded by this account
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

