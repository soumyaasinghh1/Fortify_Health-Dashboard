import React, { useState } from 'react';
import { initialMills } from './data';
import OverviewTab from './components/OverviewTab';
import MillsTab from './components/MillsTab';
import QualityTab from './components/QualityTab';
import { AlertTriangle, Activity, LayoutDashboard, Factory, ActivitySquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // This is the master state. CSV uploads in MillsTab will update this array.
  const [mills, setMills] = useState(initialMills);

  // Dynamic calculation for the warning alert banner
  const actionRequiredCount = mills.filter(m => m.compliance < 90).length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      
      {/* Sleek Enterprise Header */}
      <header className="mb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Fortify Health</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-blue-200">
              <Activity size={12} /> Programme Monitoring Dashboard
            </span>
          </div>
        </div>
      </header>

      {/* MASSIVE NAVIGATION TABS - Designed for Recruiter UX */}
      <div className="bg-slate-200/60 p-1.5 rounded-xl mb-8 shadow-inner border border-slate-200/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold rounded-lg uppercase tracking-wider transition-all ${
              activeTab === 'overview' 
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/80'
            }`}
          >
            <LayoutDashboard size={18} /> Executive Overview
          </button>
          
          <button
            onClick={() => setActiveTab('mills')}
            className={`flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold rounded-lg uppercase tracking-wider transition-all ${
              activeTab === 'mills' 
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/80'
            }`}
          >
            <Factory size={18} /> Mill Operations
          </button>

          <button
            onClick={() => setActiveTab('quality')}
            className={`flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold rounded-lg uppercase tracking-wider transition-all ${
              activeTab === 'quality' 
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/80'
            }`}
          >
            <ActivitySquare size={18} /> Quality Control
          </button>
        </div>
      </div>

      {/* Professional Warning Alert (Only shows if mills drop below 90%) */}
      {actionRequiredCount > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded-r-lg shadow-sm flex items-start gap-4">
          <AlertTriangle size={24} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800">Action Required</h3>
            <p className="text-amber-700 text-sm mt-1">
              {actionRequiredCount} partner mills are currently trending below 90% FSSAI compliance thresholds. Immediate follow-up required.
            </p>
          </div>
        </div>
      )}

      {/* Main Content Area - Renders the selected tab */}
      <main className="max-w-7xl mx-auto">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'mills' && <MillsTab mills={mills} setMills={setMills} />}
        {activeTab === 'quality' && <QualityTab />}
      </main>
    </div>
  );
}