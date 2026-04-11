import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea, ResponsiveContainer } from 'recharts';
import { Smartphone, CheckCircle, AlertTriangle, Activity, TestTube, Cpu } from 'lucide-react';
import { qualityData, aiFeed } from '../data';

const graphData = [
  ...qualityData,
  { month: 'Jul (Est)', iron: 27, isPrediction: true } 
];

export default function QualityTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Quality Control Hub</h2>
          <p className="text-sm text-slate-500 mt-1">iCheck Analytics & AI Iron Lens Feed</p>
        </div>
        <div className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
          <Activity size={16} className="text-emerald-500 animate-pulse" />
          System Status: Monitoring
        </div>
      </div>

      {/* Technology Primer Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex gap-4">
          <div className="bg-blue-50 text-blue-600 p-3 rounded-lg h-fit shrink-0">
            <TestTube size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">The Hardware: iCheck Device</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              The industry standard spectrophotometer used by mill partners on-site. It quantitatively measures the exact iron concentration (ppm) in fortified flour samples to ensure they meet the strict FSSAI 28-32 ppm standard.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex gap-4">
          <div className="bg-purple-50 text-purple-600 p-3 rounded-lg h-fit shrink-0">
            <Cpu size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">The Software: AI Iron Lens</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Fortify Health's proprietary 2025 AI tool. Partners send photos of their physical iCheck vials via WhatsApp. The AI instantly processes the image colorimetric data to estimate ppm, automating compliance tracking without manual data entry.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* The iCheck Recharts Graph */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Aggregate Iron Levels (ppm)</h3>
              <p className="text-sm text-slate-500 mt-1">Sample of all active mills. Dotted line indicates AI trend projection.</p>
            </div>
            <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-md text-xs font-semibold border border-emerald-100 shrink-0">
              FSSAI Safe Zone: 28-32 ppm
            </div>
          </div>
          
          <div className="h-80 w-full flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" domain={[20, 40]} tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '14px' }} 
                />
                
                {/* The Green Compliance Band */}
                <ReferenceArea y1={28} y2={32} fill="#10b981" fillOpacity={0.1} />
                
                {/* Historical Data Line */}
                <Line 
                  type="monotone" 
                  dataKey="iron" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 5, fill: '#ffffff', stroke: '#3b82f6', strokeWidth: 2 }} 
                  activeDot={{ r: 7, fill: '#3b82f6' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Iron Lens Live Feed Sidebar */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-white border-b border-slate-200 p-4 flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
              <Smartphone size={20} />
            </div>
            <h3 className="font-semibold text-slate-900">AI Iron Lens Feed</h3>
          </div>
          
          <div className="p-4 flex-grow overflow-y-auto space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Live WhatsApp Verification</p>
            
            {aiFeed.map((alert) => (
              <div 
                key={alert.id} 
                className={`bg-white rounded-lg p-3 shadow-sm border ${alert.status === 'Warning' ? 'border-l-4 border-l-amber-400 border-y-slate-200 border-r-slate-200' : 'border-l-4 border-l-emerald-400 border-y-slate-200 border-r-slate-200'}`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <span className="font-medium text-slate-900 text-sm">{alert.mill}</span>
                  <span className="text-xs text-slate-400">{alert.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  {alert.status === 'Pass' ? (
                    <CheckCircle size={14} className="text-emerald-500" />
                  ) : (
                    <AlertTriangle size={14} className="text-amber-500" />
                  )}
                  <span className="text-sm text-slate-600">Est: {alert.result}</span>
                  <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded ${alert.status === 'Pass' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {alert.status}
                  </span>
                </div>
              </div>
            ))}
            
            <div className="flex items-center justify-center gap-2 mt-6 text-slate-400 text-xs font-medium">
              <Activity size={14} className="animate-pulse" /> Awaiting image submissions...
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}