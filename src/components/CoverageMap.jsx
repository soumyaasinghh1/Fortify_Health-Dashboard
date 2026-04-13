import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

const allStates = [
  { id: 'mh', name: 'Maharashtra', coords: [19.7515, 75.7139], yearAdded: 2023 },
  { id: 'mp', name: 'Madhya Pradesh', coords: [22.9734, 78.6569], yearAdded: 2023 },
  { id: 'gj', name: 'Gujarat', coords: [22.2587, 71.1924], yearAdded: 2023 },
  { id: 'up', name: 'Uttar Pradesh', coords: [26.8467, 80.9462], yearAdded: 2024 },
  { id: 'rj', name: 'Rajasthan', coords: [27.0238, 74.2179], yearAdded: 2024 },
  { id: 'pb', name: 'Punjab', coords: [31.1471, 75.3412], yearAdded: 2024 },
  { id: 'hr', name: 'Haryana', coords: [29.0588, 76.0856], yearAdded: 2024 },
  { id: 'ap', name: 'Andhra Pradesh', coords: [15.9129, 79.7400], yearAdded: 2024 },
  { id: 'ka', name: 'Karnataka', coords: [15.3173, 75.7139], yearAdded: 2024 },
  { id: 'wb', name: 'West Bengal', coords: [22.9868, 87.8550], yearAdded: 2024 },
  { id: 'hp', name: 'Himachal Pradesh', coords: [31.1048, 77.1734], yearAdded: 2025 },
  { id: 'uk', name: 'Uttarakhand', coords: [30.0668, 79.0193], yearAdded: 2025 },
  { id: 'jh', name: 'Jharkhand', coords: [23.6102, 85.2799], yearAdded: 2025 },
  { id: 'bh', name: 'Bihar', coords: [25.0961, 85.3131], yearAdded: 2025 },
  { id: 'cg', name: 'Chhattisgarh', coords: [21.2787, 81.8661], yearAdded: 2025 },
  { id: 'or', name: 'Odisha', coords: [20.9517, 85.0985], yearAdded: 2025 },
];

export default function CoverageMap({ filters }) {
  const selectedYear = parseInt(filters.year);
  const activeStates = allStates.filter(state => state.yearAdded <= selectedYear);

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={18} className="text-blue-600" />
        <h3 className="font-bold text-slate-900">Expansion Progress ({selectedYear})</h3>
      </div>
      <div className="rounded-xl overflow-hidden border border-slate-200 h-[400px]">
        <MapContainer center={[22.90, 78.66]} zoom={4.5} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          {activeStates.map(state => (
            <CircleMarker key={state.id} center={state.coords} pathOptions={{ color: '#2563eb', fillColor: '#3b82f6', fillOpacity: 0.6, weight: 2 }} radius={10}>
              <Popup><div className="font-bold">{state.name}</div><div className="text-xs">Added in {state.yearAdded}</div></Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}