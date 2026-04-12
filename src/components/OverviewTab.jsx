import React, { useRef, useState } from 'react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, Building2, TrendingUp, Download, ArrowDownRight, LineChart } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { reportKpis } from '../data';
import CoverageMap from './CoverageMap';

const costData = [
  { year: '2024', cost: 0.26 },
  { year: '2025', cost: 0.22 },
];

// Extracted from the 2023, 2024, and 2025 annual reports
const historicalTrendData = [
  { year: '2023', beneficiaries: 3.8, mills: 64 },
  { year: '2024', beneficiaries: 8.5, mills: 119 },
  { year: '2025', beneficiaries: 13.1, mills: 242 },
];

export default function OverviewTab() {
  const reportRef = useRef(null);
  const [trendMetric, setTrendMetric] = useState('beneficiaries'); // Toggles the chart view

  const generatePDF = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#f8fafc' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Fortify_Health_Impact_Report_2025.pdf');
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Executive Overview</h2>
          <p className="text-sm text-slate-500 mt-1">Q4 2025 Impact Summary & Historical Trends</p>
        </div>
        <button 
          onClick={generatePDF}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Download size={18} /> Export Report
        </button>
      </div>

      {/* Report Container */}
      <div ref={reportRef} className="bg-slate-50 p-2 -m-2">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-slate-500">Beneficiaries<br/>Reached</span>
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Users size={20} /></div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{reportKpis.beneficiariesReached}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-slate-500">Active<br/>Mill Partners</span>
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Building2 size={20} /></div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{reportKpis.activeMills}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-slate-500">Monthly<br/>Flour (MT)</span>
              <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><TrendingUp size={20} /></div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{reportKpis.monthlyFlourMT}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-slate-500">Cost Per<br/>Beneficiary</span>
              <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium bg-emerald-50 px-2 py-1 rounded-md">
                <ArrowDownRight size={16} /> 15%
              </div>
            </div>
            <div className="flex items-end gap-4 mt-4">
              <p className="text-3xl font-bold text-slate-900">{reportKpis.costPerBeneficiary}</p>
              <div className="h-12 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costData}>
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="cost" radius={[4, 4, 0, 0]}>
                      {costData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 1 ? '#059669' : '#cbd5e1'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* NEW: Time Series Trend Analysis */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <LineChart size={18} className="text-blue-600"/> Multi-Year Growth Trajectory
              </h3>
              <p className="text-sm text-slate-500 mt-1">Cross-referencing programmatic scale from 2023-2025 Annual Reports.</p>
            </div>
            
            {/* Chart Data Toggles */}
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setTrendMetric('beneficiaries')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${trendMetric === 'beneficiaries' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Beneficiaries (Millions)
              </button>
              <button 
                onClick={() => setTrendMetric('mills')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${trendMetric === 'mills' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Active Mills
              </button>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={trendMetric === 'beneficiaries' ? '#3b82f6' : '#10b981'} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={trendMetric === 'beneficiaries' ? '#3b82f6' : '#10b981'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '14px' }} 
                  formatter={(value) => [trendMetric === 'beneficiaries' ? `${value} Million` : value, trendMetric === 'beneficiaries' ? 'Beneficiaries' : 'Mills']}
                />
                <Area 
                  type="monotone" 
                  dataKey={trendMetric} 
                  stroke={trendMetric === 'beneficiaries' ? '#3b82f6' : '#10b981'} 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorMetric)" 
                  activeDot={{ r: 6, fill: trendMetric === 'beneficiaries' ? '#3b82f6' : '#10b981', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <p className="text-xs text-slate-400 mb-6 text-right">
          * KPI metrics and historical calculations anchored in 2023, 2024, and 2025 Annual Report data.
        </p>
        
        <div className="mt-6">
          <CoverageMap />
        </div>
      </div>
    </div>
  );
}