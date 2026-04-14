import React, { useState } from 'react';
import { ShieldCheck, Zap, Microscope, CheckCircle2, Filter, Info, ChevronRight, BrainCircuit, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { auditLogs } from '../data';

const complianceChartData = [
  { metric: 'Adequately Fortified (>30ppm)', value: 88, color: '#10b981', key: 'Adequate' },
  { metric: 'Partially Fortified (15-30ppm)', value: 9, color: '#f59e0b', key: 'Partial' },
  { metric: 'Under Fortified (<15ppm)', value: 3, color: '#ef4444', key: 'Under' },
];

export default function QualityTab({ filters }) {
  const [internalFilter, setInternalFilter] = useState('All');

  const filteredLogs = auditLogs.filter(log => {
    const stateMatch = filters.state === 'All India' || log.state === filters.state;
    const statusMatch = internalFilter === 'All' || log.status === internalFilter;
    return stateMatch && statusMatch;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Quality Assurance Hub</h2>
          <p className="text-slate-500 text-sm mt-1">Real-time iron validation via AI Iron Lens & iCheck Assays.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl font-bold text-sm border border-emerald-200 shadow-sm">
          <ShieldCheck size={18} /> 94% Compliance
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Microscope size={20} /></div>
            <h4 className="font-bold text-slate-900">iCheck Validation Tech</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Developed by <strong>Bioanalyt in Germany</strong>, this rapid testing device measures added iron (NaFeEDTA) in fortified atta. 
            Because Indian atta has unique mineral variability, Fortify Health conducts secondary validation to ensure precision beyond standard manufacturer specs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Zap size={20} /></div>
            <h4 className="font-bold text-slate-900">AI Iron Lens Prototype</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            A collaboration with <strong>Georgia Institute of Technology</strong> and <strong>Hornbill Agritech</strong>. 
            The system uses image processing and supervised learning to remove human bias from manual spot tests, categorizing iron levels in real-time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            Compliance Breakdown ({filters.year})
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complianceChartData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="metric" type="category" axisLine={false} tickLine={false} width={150} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={35}>
                  {complianceChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-3 bg-slate-900 rounded-2xl shadow-2xl flex flex-col border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
            <div className="flex items-center gap-3 text-emerald-400">
              <Activity size={20} />
              <h3 className="font-bold text-white">Internal Audit Log: {filters.state}</h3>
            </div>
            <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
              {['All', 'Adequate', 'Partial', 'Under'].map(f => (
                <button 
                  key={f}
                  onClick={() => setInternalFilter(f)}
                  className={`px-2 py-1 text-[10px] font-bold rounded transition-all ${internalFilter === f ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[300px] custom-scrollbar">
            {filteredLogs.length > 0 ? filteredLogs.map(log => (
              <div key={log.id} className="group flex items-center justify-between p-4 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl border border-white/5 transition-all">
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{log.mill}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">{log.state} • {log.date}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black ${
                  log.status === 'Adequate' ? 'bg-emerald-500/20 text-emerald-400' : 
                  log.status === 'Partial' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                }`}>
                  {log.iron} PPM
                </div>
              </div>
            )) : (
              <div className="text-center py-20 text-slate-500 text-sm italic">No logs found for this filter criteria.</div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-8 bg-slate-50 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
            <BrainCircuit size={24} className="text-purple-600" />
            AI Methodology: Image Processing & Iron Content Estimation
          </h3>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="text-xs font-black text-purple-600 uppercase tracking-widest">01. Pre-Processing</div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Iron spot test images are cropped and brightness-normalized to eliminate lighting bias. A calibrated threshold masks glare, ensuring consistent input for the detector.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-xs font-black text-purple-600 uppercase tracking-widest">02. Feature Extraction</div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              We apply OpenCV’s multi-scale blob detector to isolate iron-reaction spots. This extracts key features like spot count and density to feed the predictive models.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-xs font-black text-purple-600 uppercase tracking-widest">03. Dual-Model Prediction</div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              <strong>Regression:</strong> Predicts numerical iron concentration.<br/>
              <strong>Classification:</strong> Determines if content meets FSSAI (14-21.25 mg/kg) regulatory standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}