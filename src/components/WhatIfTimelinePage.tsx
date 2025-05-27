import React, { useState } from 'react';

const formatNumber = (num: number, decimals = 2) => {
  if (isNaN(num) || num === null) return '';
  return num.toLocaleString(undefined, { maximumFractionDigits: decimals });
};

const WhatIfTimelinePage: React.FC = () => {
  const [ir, setIr] = useState<string>(''); // Incidence Rate (%)
  const [target, setTarget] = useState<string>(''); // Completes (N)
  const [days, setDays] = useState<string>(''); // Field Days
  const [lastChanged, setLastChanged] = useState<'ir' | 'target' | 'days' | null>(null);

  let numIr = parseFloat(ir);
  let numTarget = parseFloat(target);
  let numDays = parseFloat(days);

  // Calculate the missing value
  if (lastChanged === 'ir' && ir && target) {
    numDays = numIr !== 0 ? Math.ceil(numTarget / (numIr / 100)) : 0;
  } else if (lastChanged === 'target' && ir && target) {
    numDays = numIr !== 0 ? Math.ceil(numTarget / (numIr / 100)) : 0;
  } else if (lastChanged === 'days' && ir && days) {
    numTarget = Math.floor((numIr / 100) * numDays);
  } else if (lastChanged === 'days' && target && days) {
    numIr = numDays !== 0 ? (numTarget / numDays) * 100 : 0;
  }

  // Handlers
  const handleIrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIr(e.target.value);
    setLastChanged('ir');
  };
  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(e.target.value);
    setLastChanged('target');
  };
  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDays(e.target.value);
    setLastChanged('days');
  };

  // Scenario toggles
  const handleIrSlider = (v: number) => {
    setIr(v.toString());
    setLastChanged('ir');
  };
  const handleDaysStepper = (v: number) => {
    setDays(v.toString());
    setLastChanged('days');
  };
  const handleDropIr = () => {
    if (!numIr) return;
    const newIr = (numIr * 0.9).toFixed(2); // Drop IR by 10%
    setIr(newIr);
    setLastChanged('ir');
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Timeline vs Daily IR vs Completes</h2>
      <p className="mb-4 text-gray-600">Input any two, calculate the third. Try scenario toggles below.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Daily IR (%)</label>
          <input type="number" min="0" step="0.01" value={ir} onChange={handleIrChange} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Target Completes (N)</label>
          <input type="number" min="0" step="1" value={target} onChange={handleTargetChange} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Field Days</label>
          <input type="number" min="0" step="1" value={days} onChange={handleDaysChange} className="border rounded px-3 py-2 w-full" />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">IR Scenario</label>
          <input type="range" min="0" max="100" step="0.01" value={ir || 0} onChange={e => handleIrSlider(Number(e.target.value))} className="w-full" />
          <div className="text-xs text-gray-600">{ir || 0}%</div>
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Days Scenario</label>
          <div className="flex items-center gap-2">
            <button onClick={() => handleDaysStepper((numDays || 0) - 1)} className="px-2 py-1 bg-gray-100 rounded">-1</button>
            <span className="text-base">{days || 0}</span>
            <button onClick={() => handleDaysStepper((numDays || 0) + 1)} className="px-2 py-1 bg-gray-100 rounded">+1</button>
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Quick Drop IR</label>
          <button onClick={handleDropIr} className="w-full px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Drop IR 10%</button>
        </div>
      </div>
      <div className="mt-4 text-lg font-semibold text-gray-800">
        {numIr && numTarget && (
          <span>Daily Completes = {formatNumber(numIr)}% × {formatNumber(numDays)} days = <span className="text-blue-700">{formatNumber((numIr / 100) * numDays, 0)}</span></span>
        )}
      </div>
      <div className="mt-6 text-base text-gray-700">
        <div className="mb-1 font-semibold">Formulas:</div>
        <ul className="list-disc list-inside space-y-1">
          <li><b>Days</b> = Target Completes / (Daily IR / 100)</li>
          <li><b>Target Completes</b> = (Daily IR / 100) × Days</li>
          <li><b>Daily IR (%)</b> = Target Completes / Days × 100</li>
        </ul>
      </div>
    </div>
  );
};

export default WhatIfTimelinePage; 