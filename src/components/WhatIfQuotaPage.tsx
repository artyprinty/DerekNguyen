import React, { useState } from 'react';

const defaultSegments = [
  { name: 'Age 18–24', percent: 20, n: 200 },
  { name: 'Age 25–34', percent: 40, n: 400 },
];

const formatNumber = (num: number, decimals = 0) => {
  if (isNaN(num) || num === null) return '';
  return num.toLocaleString(undefined, { maximumFractionDigits: decimals });
};

const WhatIfQuotaPage: React.FC = () => {
  const [segments, setSegments] = useState(defaultSegments);
  const [totalN, setTotalN] = useState(segments.reduce((sum, s) => sum + s.n, 0));

  // Update segment value
  const updateSegment = (idx: number, field: 'name' | 'percent' | 'n', value: string | number) => {
    setSegments(segs => {
      const updated = segs.map((s, i) =>
        i === idx ? { ...s, [field]: field === 'name' ? value : Number(value) } : s
      );
      if (field === 'n') setTotalN(updated.reduce((sum, s) => sum + s.n, 0));
      return updated;
    });
  };

  // Add/remove segment
  const addSegment = () => setSegments(segs => [...segs, { name: '', percent: 0, n: 0 }]);
  const removeSegment = (idx: number) => setSegments(segs => segs.length > 1 ? segs.filter((_, i) => i !== idx) : segs);

  // Adjust N with +/-
  const adjustN = (idx: number, delta: number) => {
    setSegments(segs => {
      const updated = segs.map((s, i) =>
        i === idx ? { ...s, n: Math.max(0, s.n + delta) } : s
      );
      setTotalN(updated.reduce((sum, s) => sum + s.n, 0));
      return updated;
    });
  };

  // Reset
  const handleReset = () => {
    setSegments(defaultSegments);
    setTotalN(defaultSegments.reduce((sum, s) => sum + s.n, 0));
  };

  // Normalize %
  const handleNormalize = () => {
    setSegments(segs => {
      const sumN = segs.reduce((sum, s) => sum + s.n, 0);
      return segs.map(s => ({ ...s, percent: sumN ? (s.n / sumN) * 100 : 0 }));
    });
  };

  // Calculations
  const sumPercent = segments.reduce((sum, s) => sum + (Number(s.percent) || 0), 0);
  const sumN = segments.reduce((sum, s) => sum + (Number(s.n) || 0), 0);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Quota What-Ifs</h2>
      <p className="text-gray-600 mb-4">Live table for segment adjustments. Adjust targets and see impact instantly.</p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 rounded mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left font-semibold">Segment</th>
              <th className="py-2 px-4 text-left font-semibold">Target %</th>
              <th className="py-2 px-4 text-left font-semibold">Target N</th>
              <th className="py-2 px-4 text-left font-semibold">Adjusted N</th>
              <th className="py-2 px-4 text-left font-semibold">What if +/-</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {segments.map((seg, idx) => (
              <tr key={idx} className="border-t border-gray-200">
                <td className="py-2 px-4">
                  <input type="text" value={seg.name} onChange={e => updateSegment(idx, 'name', e.target.value)} className="border rounded px-2 py-1 w-32" />
                </td>
                <td className="py-2 px-4">
                  <input type="number" min="0" max="100" step="0.01" value={seg.percent} onChange={e => updateSegment(idx, 'percent', e.target.value)} className="border rounded px-2 py-1 w-20" />
                </td>
                <td className="py-2 px-4">
                  <input type="number" min="0" step="1" value={seg.n} onChange={e => updateSegment(idx, 'n', e.target.value)} className="border rounded px-2 py-1 w-20" />
                </td>
                <td className="py-2 px-4 text-base text-gray-700 font-semibold">{formatNumber((sumN * (seg.percent / 100)), 0)}</td>
                <td className="py-2 px-4">
                  <button onClick={() => adjustN(idx, -10)} className="px-2 py-1 bg-gray-100 rounded mr-1">-10</button>
                  <button onClick={() => adjustN(idx, +10)} className="px-2 py-1 bg-gray-100 rounded">+10</button>
                </td>
                <td className="py-2 px-4">
                  <button onClick={() => removeSegment(idx)} className="text-red-500 px-2">✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <button onClick={addSegment} className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">+ Add Segment</button>
        <button onClick={handleReset} className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Reset</button>
        <button onClick={handleNormalize} className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200">Normalize %</button>
      </div>
      <div className="mt-4 text-base text-gray-700">
        <div>Total N: <span className="font-bold">{formatNumber(sumN, 0)}</span></div>
        <div>Sum of %: <span className="font-bold">{formatNumber(sumPercent, 2)}%</span></div>
        {Math.abs(sumPercent - 100) > 0.01 && <div className="text-yellow-600">Warning: Percentages do not sum to 100%.</div>}
      </div>
    </div>
  );
};

export default WhatIfQuotaPage; 