import React, { useState } from 'react';
import { initialMills } from './data';
import OverviewTab from './components/OverviewTab';
import MillsTab from './components/MillsTab';
import QualityTab from './components/QualityTab';
import { AlertTriangle, Activity } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mills, setMills] = useState(initialMills);

  const actionRequiredCount = mills.filter(m => m.compliance < 90).length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <header className="mb-8 flex flex-col md:flex-row justify-between md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Fortify Health</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Activity size={12} /> Programme Monitoring
            </span>
          </div>
        </div>
        
        {/* Sleek, modern navigation pills */}
        <div className="flex gap-2 bg-slate-200/50 p-1 rounded-lg">
          {['overview', 'mills', 'quality'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-all ${
                activeTab === tab 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Professional Warning Alert */}
      {actionRequiredCount > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded-r-lg shadow-sm flex items-start gap-4">
          <AlertTriangle size={24} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-xl text-amber-800">Action Required</h3>
            <p className="text-amber-700 text-2xl mt-1">
              {actionRequiredCount} partner mills are currently trending below 90% FSSAI compliance thresholds. Immediate follow-up required.
            </p>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'mills' && <MillsTab mills={mills} setMills={setMills} />}
        {activeTab === 'quality' && <QualityTab />}
      </main>
    </div>
  );
}