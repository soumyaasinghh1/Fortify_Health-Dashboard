import React, { useState } from 'react';
import Papa from 'papaparse';
import { Upload, AlertCircle, CheckCircle, AlertTriangle, Info, Download } from 'lucide-react';

export default function MillsTab({ mills, setMills }) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');

  // Enterprise RAG styling
  const getRagStatus = (compliance) => {
    if (compliance >= 90) return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Compliant', icon: <CheckCircle size={14}/> };
    if (compliance >= 70) return { bg: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Warning', icon: <AlertTriangle size={14}/> };
    return { bg: 'bg-rose-50 text-rose-700 border-rose-200', label: 'Action Required', icon: <AlertCircle size={14}/> };
  };

  const uniqueStates = ['All', ...new Set(mills.map(m => m.state))];

  const filteredMills = mills.filter(mill => {
    const rag = getRagStatus(mill.compliance).label;
    // Map backend statuses to filter dropdown labels
    let mappedStatus = 'All';
    if (rag === 'Compliant') mappedStatus = 'Green';
    if (rag === 'Warning') mappedStatus = 'Amber';
    if (rag === 'Action Required') mappedStatus = 'Red';

    const matchesStatus = statusFilter === 'All' ? true : mappedStatus === statusFilter;
    const matchesState = stateFilter === 'All' ? true : mill.state === stateFilter;
    return matchesStatus && matchesState;
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const newMills = results.data.map((row, index) => ({
          id: Date.now() + index,
          name: row.Name || 'Unknown Mill',
          state: row.State || 'Unknown',
          size: row.Size || 'Unknown',
          compliance: parseInt(row.Compliance) || 0,
          lastTest: row.LastTest || new Date().toISOString().split('T')[0],
          institution: row.Institution || 'None',
        }));
        setMills([...mills, ...newMills]);
      }
    });
  };

  const handleDownloadSample = () => {
    const csvContent = "data:text/csv;charset=utf-8,Name,State,Size,Compliance,LastTest,Institution\nTest Mill Alpha,Bihar,Large,62,2026-04-10,PDS\nTest Mill Beta,Uttar Pradesh,Medium,88,2026-04-11,None\nTest Mill Gamma,Karnataka,Small,96,2026-04-12,Akshaya Patra";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "fortify_sample_data.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header & CSV Upload */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Mill Operations Hub</h2>
          <p className="text-sm text-slate-500 mt-1">Compliance & Partner Tracking</p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="relative overflow-hidden cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors">
            <input 
              type="file" 
              accept=".csv"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />
            <div className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium">
              <Upload size={18} /> Import Lab Data (CSV)
            </div>
          </div>
          <button onClick={handleDownloadSample} className="text-xs font-medium text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
            <Download size={14} /> Download example CSV
          </button>
        </div>
      </div>

      {/* Contextual Blurb */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start shadow-sm">
        <Info className="shrink-0 text-blue-600 mt-0.5" size={20} />
        <p className="text-sm text-blue-900 leading-relaxed">
          <strong className="font-semibold">How to use this tool:</strong> Upload a CSV of new lab results to instantly update the global state. The dashboard will automatically recalculate RAG compliance tags based on the rubric below and trigger system alerts on the Overview tab if mills fall out of compliance.
        </p>
      </div>

      {/* The RAG Compliance Rubric */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">iCheck Compliance Rubric</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-emerald-800 text-sm">Compliant</h4>
              <CheckCircle size={18} className="text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-900 mb-1">&gt;90%</p>
            <p className="text-xs text-emerald-700/80">Pass rate on recent FSSAI lab validations. Standard monitoring continues.</p>
          </div>
          <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-amber-800 text-sm">Warning</h4>
              <AlertTriangle size={18} className="text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-900 mb-1">70-90%</p>
            <p className="text-xs text-amber-700/80">Inconsistent iron levels detected. Flag for equipment calibration or refresher training.</p>
          </div>
          <div className="bg-rose-50/50 border border-rose-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-rose-800 text-sm">Action Required</h4>
              <AlertCircle size={18} className="text-rose-600" />
            </div>
            <p className="text-2xl font-bold text-rose-900 mb-1">&lt;70%</p>
            <p className="text-xs text-rose-700/80">Critical failure to meet standards. Triggers immediate site visit and corrective action plan.</p>
          </div>
        </div>
      </div>

      {/* Filters and Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Filter by Status</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Red">Action Required</option>
                <option value="Amber">Warning</option>
                <option value="Green">Compliant</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Filter by State</label>
              <select 
                value={stateFilter} 
                onChange={(e) => setStateFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none cursor-pointer"
              >
                {uniqueStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Mill Name</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">State</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Compliance</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Institution</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMills.length > 0 ? (
                filteredMills.map((mill) => {
                  const rag = getRagStatus(mill.compliance);
                  return (
                    <tr key={mill.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-sm font-medium text-slate-900">{mill.name}</td>
                      <td className="p-4 text-sm text-slate-500">{mill.state}</td>
                      <td className="p-4 text-sm font-mono font-medium text-slate-700">{mill.compliance}%</td>
                      <td className="p-4">
                        {mill.institution !== 'None' ? (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                            {mill.institution}
                          </span>
                        ) : (
                          <span className="text-slate-300 text-sm">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${rag.bg}`}>
                          {rag.icon} {rag.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-sm text-slate-500">
                    No mills match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}