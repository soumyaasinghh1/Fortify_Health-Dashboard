import React, { useState } from 'react';
import OverviewTab from './components/OverviewTab';
import QualityTab from './components/QualityTab';
import { LayoutDashboard, ShieldCheck, Filter, ChevronDown } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({ state: 'All India', year: '2025' });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-slate-300 p-6 hidden lg:block z-50">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">F</div>
          <h1 className="text-xl font-bold text-white tracking-tight">Fortify Health</h1>
        </div>
        
        <div className="space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'hover:bg-slate-800'}`}>
            <LayoutDashboard size={20} /> <span className="font-medium">Overview</span>
          </button>
          <button onClick={() => setActiveTab('quality')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'quality' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'hover:bg-slate-800'}`}>
            <ShieldCheck size={20} /> <span className="font-medium">Quality Control</span>
          </button>
        </div>
      </nav>

      <main className="lg:ml-64 p-8">
        <div className="flex flex-wrap items-center gap-6 mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <Filter size={18} />
            <span className="text-[15px] font-bold uppercase tracking-widest">Filters</span>
          </div>
          
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1">By State</label>
            <select 
              value={filters.state}
              onChange={(e) => setFilters({...filters, state: e.target.value})}
              className="bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 py-1.5 px-3 rounded-md outline-none"
            >
              <option>All India</option>
              <option>Madhya Pradesh</option>
              <option>Gujarat</option>
              <option>Maharashtra</option>
              <option>Uttar Pradesh</option>
              <option>Rajasthan</option>
            </select>
          </div>

          <div className="h-10 w-px bg-slate-200" />

          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1">Analysis Year</label>
            <select 
              value={filters.year}
              onChange={(e) => setFilters({...filters, year: e.target.value})}
              className="bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 py-1.5 px-3 rounded-md outline-none"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>

      <div className="animate-in fade-in duration-500">
      {activeTab === 'overview' && <OverviewTab filters={filters} />}
      {activeTab === 'quality' && <QualityTab filters={filters} />} 
    </div>
      </main>
    </div>
  );
}

export default App;