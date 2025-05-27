import React, { useState } from 'react';

const formatNumber = (num: number, decimals = 2) => {
  if (isNaN(num) || num === null) return '';
  return num.toLocaleString(undefined, { maximumFractionDigits: decimals });
};

const WhatIfSoftLaunchPage: React.FC = () => {
  const [totalCompletes, setTotalCompletes] = useState('');
  const [softLaunchPct, setSoftLaunchPct] = useState('10');
  const [softIr, setSoftIr] = useState('15');
  const [mainIr, setMainIr] = useState('20');

  // Parse numbers
  const numTotalCompletes = parseFloat(totalCompletes);
  const numSoftLaunchPct = parseFloat(softLaunchPct);
  const numSoftIr = parseFloat(softIr);
  const numMainIr = parseFloat(mainIr);

  // Calculations
  const softLaunchN = Math.round(numTotalCompletes * (numSoftLaunchPct / 100));
  const mainLaunchN = numTotalCompletes - softLaunchN;
  const softDays = numSoftIr ? Math.ceil(softLaunchN / (numSoftIr / 100)) : 0;
  const mainDays = numMainIr ? Math.ceil(mainLaunchN / (numMainIr / 100)) : 0;
  const totalDays = softDays + mainDays;

  // Scenario toggles
  const handleSoftPctSlider = (v: number) => setSoftLaunchPct(v.toString());
  const handleSoftIrSlider = (v: number) => setSoftIr(v.toString());
  const handleMainIrSlider = (v: number) => setMainIr(v.toString());
  const handleQuickSoft20 = () => setSoftLaunchPct('20');

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Soft Launch Planning</h2>
      <p className="mb-4 text-gray-600">Plan your soft launch. Adjust soft launch %, IRs, and see the impact on timeline instantly.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Completes (N)</label>
          <input type="number" min="0" step="1" value={totalCompletes} onChange={e => setTotalCompletes(e.target.value)} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Soft Launch %</label>
          <input type="number" min="0" max="100" step="0.1" value={softLaunchPct} onChange={e => setSoftLaunchPct(e.target.value)} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Soft Launch IR (%)</label>
          <input type="number" min="0" max="100" step="0.01" value={softIr} onChange={e => setSoftIr(e.target.value)} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Main Launch IR (%)</label>
          <input type="number" min="0" max="100" step="0.01" value={mainIr} onChange={e => setMainIr(e.target.value)} className="border rounded px-3 py-2 w-full" />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Soft Launch % Scenario</label>
          <input type="range" min="0" max="50" step="0.1" value={softLaunchPct} onChange={e => handleSoftPctSlider(Number(e.target.value))} className="w-full" />
          <div className="text-xs text-gray-600">{softLaunchPct}%</div>
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Soft IR Scenario</label>
          <input type="range" min="0" max="100" step="0.01" value={softIr} onChange={e => handleSoftIrSlider(Number(e.target.value))} className="w-full" />
          <div className="text-xs text-gray-600">{softIr}%</div>
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Main IR Scenario</label>
          <input type="range" min="0" max="100" step="0.01" value={mainIr} onChange={e => handleMainIrSlider(Number(e.target.value))} className="w-full" />
          <div className="text-xs text-gray-600">{mainIr}%</div>
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Quick Soft Launch 20%</label>
          <button onClick={handleQuickSoft20} className="w-full px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Set to 20%</button>
        </div>
      </div>
      <div className="mt-4 text-lg font-semibold text-gray-800">
        <div>Soft Launch: <span className="text-blue-700">{formatNumber(softLaunchN, 0)}</span> completes @ {softIr}% IR → <span className="text-blue-700">{formatNumber(softDays, 0)}</span> days</div>
        <div>Main Launch: <span className="text-blue-700">{formatNumber(mainLaunchN, 0)}</span> completes @ {mainIr}% IR → <span className="text-blue-700">{formatNumber(mainDays, 0)}</span> days</div>
        <div className="mt-2">Total Field Days: <span className="text-green-700 font-bold">{formatNumber(totalDays, 0)}</span></div>
      </div>
      <div className="mt-6 text-base text-gray-700">
        <div className="mb-1 font-semibold">Formulas:</div>
        <ul className="list-disc list-inside space-y-1">
          <li><b>Soft Launch N</b> = Total Completes × (Soft Launch % / 100)</li>
          <li><b>Main Launch N</b> = Total Completes - Soft Launch N</li>
          <li><b>Soft Launch Days</b> = Soft Launch N / (Soft IR / 100)</li>
          <li><b>Main Launch Days</b> = Main Launch N / (Main IR / 100)</li>
          <li><b>Total Days</b> = Soft Launch Days + Main Launch Days</li>
        </ul>
      </div>
    </div>
  );
};

export default WhatIfSoftLaunchPage; 