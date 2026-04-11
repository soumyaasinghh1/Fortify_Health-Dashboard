import React, { useRef } from 'react';
import { BarChart, Bar, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, Building2, TrendingUp, Download, ArrowDownRight } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { reportKpis } from '../data';
import CoverageMap from './CoverageMap';

const costData = [
  { year: '2024', cost: 0.26 },
  { year: '2025', cost: 0.22 },
];

export default function OverviewTab() {
  const reportRef = useRef(null);

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
          <h2 className="text-3xl font-bold text-slate-900">Executive Overview</h2>
          <p className="text-sm text-slate-500 mt-1">Q4 2025 Impact Summary</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          
          {/* Clean KPI Cards */}
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

          {/* Micro-Chart Card */}
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
        
        <p className="text-sm text-slate-400 mb-6 mt-2 text-right">
          * KPI metrics and cost calculations anchored in 2025 Annual Report data.
        </p>
        
        <div className="mt-6">
          <CoverageMap />
        </div>
      </div>
    </div>
  );
}