import React, { useState } from 'react';

const formatNumber = (num: number) => {
  if (isNaN(num) || num === null) return '';
  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

const WhatIfCostCPIPage: React.FC = () => {
  const [cpi, setCpi] = useState<string>('');
  const [completes, setCompletes] = useState<string>('');
  const [total, setTotal] = useState<string>('');
  const [lastChanged, setLastChanged] = useState<'cpi' | 'completes' | 'total' | null>(null);

  // Calculate the missing value
  let numCpi = parseFloat(cpi);
  let numCompletes = parseFloat(completes);
  let numTotal = parseFloat(total);

  if (lastChanged === 'cpi' && cpi && completes) {
    numTotal = numCpi * numCompletes;
  } else if (lastChanged === 'completes' && cpi && completes) {
    numTotal = numCpi * numCompletes;
  } else if (lastChanged === 'total' && cpi && total) {
    numCompletes = numCpi !== 0 ? numTotal / numCpi : 0;
  } else if (lastChanged === 'total' && completes && total) {
    numCpi = numCompletes !== 0 ? numTotal / numCompletes : 0;
  }

  // Handlers
  const handleCpiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpi(e.target.value);
    setLastChanged('cpi');
  };
  const handleCompletesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompletes(e.target.value);
    setLastChanged('completes');
  };
  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(e.target.value);
    setLastChanged('total');
  };

  // Scenario toggles
  const handleCpiSlider = (v: number) => {
    setCpi(v.toString());
    setLastChanged('cpi');
  };
  const handleCompletesStepper = (v: number) => {
    setCompletes(v.toString());
    setLastChanged('completes');
  };
  const handleNegotiate = () => {
    if (!numCpi) return;
    const newCpi = (numCpi * 0.95).toFixed(2);
    setCpi(newCpi);
    setLastChanged('cpi');
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Cost vs CPI vs Completes</h2>
      <p className="mb-4 text-gray-600">Input any two, calculate the third. Try scenario toggles below.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">CPI ($)</label>
          <input type="number" min="0" step="0.01" value={cpi} onChange={handleCpiChange} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Completes (N)</label>
          <input type="number" min="0" step="1" value={completes} onChange={handleCompletesChange} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Cost ($)</label>
          <input type="number" min="0" step="0.01" value={total} onChange={handleTotalChange} className="border rounded px-3 py-2 w-full" />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">CPI Scenario</label>
          <input type="range" min="0" max="20" step="0.01" value={cpi || 0} onChange={e => handleCpiSlider(Number(e.target.value))} className="w-full" />
          <div className="text-xs text-gray-600">${cpi || 0}</div>
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Completes Scenario</label>
          <div className="flex items-center gap-2">
            <button onClick={() => handleCompletesStepper((numCompletes || 0) - 100)} className="px-2 py-1 bg-gray-100 rounded">-100</button>
            <span className="text-sm">{completes || 0}</span>
            <button onClick={() => handleCompletesStepper((numCompletes || 0) + 100)} className="px-2 py-1 bg-gray-100 rounded">+100</button>
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Quick Negotiate</label>
          <button onClick={handleNegotiate} className="w-full px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Negotiate 5% Lower CPI</button>
        </div>
      </div>
      <div className="mt-4 text-lg font-semibold text-gray-800">
        {numCpi && numCompletes && (
          <span>Total = ${formatNumber(numCpi)} × {formatNumber(numCompletes)} = <span className="text-blue-700">${formatNumber(numCpi * numCompletes)}</span></span>
        )}
      </div>
    </div>
  );
};

export default WhatIfCostCPIPage; 