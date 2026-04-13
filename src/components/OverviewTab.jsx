import React, { useRef, useState } from 'react';
import { BarChart, Bar, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Users, Building2, TrendingUp, Download, TrendingDown, Info, Globe, ChevronRight, Calculator, Heart } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { yearlyStats, regionalData } from '../data';
import CoverageMap from './CoverageMap';

const historicalTrendData = [
  { year: '2023', beneficiaries: 2.1, cost: 0.38 },
  { year: '2024', beneficiaries: 6.5, cost: 0.26 },
  { year: '2025', beneficiaries: 13.1, cost: 0.22 },
];

export default function OverviewTab({ filters }) {
  const reportRef = useRef(null);
  const [donation, setDonation] = useState(100000);

  const currentStats = yearlyStats[filters.year][filters.state];
  const impactLives = Math.floor(donation / 0.22);

  const generatePDF = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#f8fafc' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'pt', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), (canvas.height * pdf.internal.pageSize.getWidth()) / canvas.width);
    pdf.save(`Fortify_Health_${filters.state}_Snapshot.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{filters.state} Dashboard ({filters.year})</h2>
          <p className="text-slate-500 text-sm mt-1">Status as of Q4 {filters.year}.</p>
        </div>
        <button onClick={generatePDF} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-blue-700 transition-all">
          <Download size={18} className="inline mr-2" /> Export Snapshot
        </button>
      </div>

      <div ref={reportRef} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Reach</span>
            <div className="text-3xl font-bold text-slate-900 mt-2">{currentStats.reach}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mills</span>
            <div className="text-3xl font-bold text-slate-900 mt-2">{currentStats.mills}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Production</span>
            <div className="text-3xl font-bold text-slate-900 mt-2">{currentStats.prod}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Efficiency</span>
            <div className="text-3xl font-bold text-slate-900 mt-2">{currentStats.cost}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-2">Scale Analysis <Globe size={16} className="text-blue-500" /></h3>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={historicalTrendData} margin={{ top: 10, right: 40, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fontSize: 12}} label={{ value: 'Millions', angle: -90, position: 'insideLeft', fontSize: 10, offset: 0 }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#10b981'}} label={{ value: 'USD', angle: 90, position: 'insideRight', fontSize: 10, offset: 0 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    formatter={(value, name) => {
                       const isCost = name.toLowerCase().includes('cost');
                       return [isCost ? `$${value}` : `${value}M`, isCost ? 'Annual Cost/Person' : 'Monthly Reach'];
                    }}
                  />
                  <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '20px' }} />
                  <Bar yAxisId="left" dataKey="beneficiaries" name="Reach" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={45} />
                  <Line yAxisId="right" dataKey="cost" name="Cost" stroke="#10b981" strokeWidth={4} dot={{r: 6, fill: '#10b981', strokeWidth: 3, stroke: '#fff'}} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">Regional Status <ChevronRight size={16} className="text-slate-400" /></h3>
            <div className="flex-1 space-y-6">
              {regionalData.map((data, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider mb-2">
                    <span className={filters.state === data.state ? 'text-blue-600 font-extrabold' : 'text-slate-500'}>{data.state}</span>
                    <span className="text-slate-900">{data.mills} Mills</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-1000 ${filters.state === data.state ? 'bg-blue-600' : 'bg-blue-400'}`} style={{ width: `${(data.mills / 62) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2"><Calculator size={24} className="text-emerald-600" /> Impact Simulator</h3>
              <p className="text-slate-500 text-sm mb-6">Invest in expansion. Based on current efficiency of <span className="font-bold text-slate-900">$0.22/person</span>.</p>
              <input type="range" min="5000" max="1000000" step="5000" value={donation} onChange={(e) => setDonation(parseInt(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              <div className="mt-2 text-blue-600 font-bold text-right">${donation.toLocaleString()} USD</div>
            </div>
            <div className="w-full md:w-64 bg-emerald-600 rounded-2xl p-6 text-white text-center shadow-lg">
              <Heart className="mx-auto mb-2 fill-emerald-400 text-emerald-400" size={24} />
              <div className="text-3xl font-black">{impactLives.toLocaleString()}</div>
              <div className="text-[10px] font-medium opacity-80 uppercase tracking-widest">Lives Reached / Year</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
           <CoverageMap filters={filters} />
        </div>
      </div>
    </div>
  );
}