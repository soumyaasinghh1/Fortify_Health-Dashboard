// Data extracted from the Fortify Health 2025 Annual Report
export const reportKpis = {
  beneficiariesReached: "13.1M", // [cite: 110]
  activeMills: 242,              // [cite: 116]
  monthlyFlourMT: "69.3K",       // [cite: 156]
  costPerBeneficiary: "$0.22",   // [cite: 189]
  costTrend: "down", // From $0.26 in 2024
};

// Initial mill data with institutional tagging
export const initialMills = [
  { id: 1, name: 'Apex Milling', state: 'Gujarat', size: 'Large', compliance: 94, lastTest: '2026-04-01', institution: 'Akshaya Patra' }, // [cite: 277]
  { id: 2, name: 'Sunrise Flour', state: 'Madhya Pradesh', size: 'Medium', compliance: 82, lastTest: '2026-03-15', institution: 'None' },
  { id: 3, name: 'Valley Grains', state: 'Maharashtra', size: 'Small', compliance: 65, lastTest: '2026-02-10', institution: 'Atma Malik' },
  { id: 4, name: 'Northern Wheat', state: 'Punjab', size: 'Large', compliance: 91, lastTest: '2026-04-05', institution: 'None' },
  { id: 5, name: 'Ganges Mill', state: 'Uttar Pradesh', size: 'Medium', compliance: 72, lastTest: '2026-03-20', institution: 'None' },
];

// Mock data for the AI Iron Lens Live Feed
export const aiFeed = [
  { id: 1, time: '10:42 AM', mill: 'Sunrise Flour', result: '29 ppm', status: 'Pass' },
  { id: 2, time: '09:15 AM', mill: 'Valley Grains', result: '26 ppm', status: 'Warning' },
  { id: 3, time: '08:30 AM', mill: 'Apex Milling', result: '31 ppm', status: 'Pass' },
];

// Historical data for the Recharts graph
export const qualityData = [
  { month: 'Jan', iron: 28 }, { month: 'Feb', iron: 31 },
  { month: 'Mar', iron: 29 }, { month: 'Apr', iron: 27 }, 
  { month: 'May', iron: 30 }, { month: 'Jun', iron: 32 },
];