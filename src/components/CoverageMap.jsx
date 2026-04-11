import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, AlertTriangle } from 'lucide-react';

const activeMills = [
  { id: 1, name: 'Apex Milling', coords: [22.2587, 71.1924], state: 'Gujarat' },
  { id: 2, name: 'Sunrise Flour', coords: [22.9734, 78.6569], state: 'Madhya Pradesh' },
  { id: 3, name: 'Valley Grains', coords: [19.7515, 75.7139], state: 'Maharashtra' },
  { id: 4, name: 'Northern Wheat', coords: [31.1471, 75.3412], state: 'Punjab' },
];

const coverageGaps = [
  { state: 'Uttar Pradesh', coords: [26.8467, 80.9462], burden: '62%' },
  { state: 'Bihar', coords: [25.0961, 85.3131], burden: '63%' },
  { state: 'Rajasthan', coords: [27.0238, 74.2179], burden: '58%' },
];

export default function CoverageMap() {
  const [showGaps, setShowGaps] = useState(false);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">National Coverage & Expansion</h3>
          <p className="text-xl text-slate-500 mt-1">Active mill density vs. High-burden regions.</p>
        </div>
        
        <button 
          onClick={() => setShowGaps(!showGaps)}
          className={`flex items-center gap-2 px-4 py-2 text-xl font-medium rounded-lg transition-colors border ${
            showGaps 
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {showGaps ? <AlertTriangle size={16} /> : <Map size={19} />}
          {showGaps ? 'Hide Gaps' : 'Highlight Coverage Gaps'}
        </button>
      </div>

      {/* The Leaflet Map Container */}
      <div className="rounded-lg overflow-hidden border border-slate-200 relative z-0">
        <MapContainer 
          center={[22.90, 78.66]} 
          zoom={5} 
          scrollWheelZoom={false}
          style={{ height: '500px', width: '100%', zIndex: 1 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {activeMills.map(mill => (
            <CircleMarker 
              key={mill.id} 
              center={mill.coords} 
              pathOptions={{ color: '#047857', fillColor: '#10b981', fillOpacity: 0.8, weight: 2 }}
              radius={8}
            >
              <Popup>
                <div className="font-bold text-slate-900">{mill.name}</div>
                <div className="text-sm text-slate-500">{mill.state}</div>
              </Popup>
            </CircleMarker>
          ))}

          {showGaps && coverageGaps.map((gap, index) => (
            <Circle 
              key={`gap-${index}`}
              center={gap.coords}
              pathOptions={{ color: '#be185d', fillColor: '#f43f5e', fillOpacity: 0.4, weight: 2, dashArray: '4' }}
              radius={150000}
            >
              <Popup>
                <div className="font-bold text-rose-600">Expansion Target</div>
                <div className="font-medium text-slate-800">{gap.state}</div>
                <div className="text-sm text-slate-600">Est. Anemia Burden: {gap.burden}</div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>

      {/* Explanatory Context */}
      <div className="mt-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
          <div className="flex items-start gap-2">
            <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mt-1 shrink-0"></span>
            <p><strong>Active Mill Density:</strong> Represents currently onboarded industrial partners.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="inline-block w-3 h-3 bg-rose-400 rounded-full mt-1 shrink-0"></span>
            <p><strong>Strategic Coverage Gaps:</strong> Pulsing zones indicate states with a critically high anemia burden (&gt;50%) but currently low industrial mill density in the network.</p>
          </div>
        </div>
      </div>
    </div>
  );
}