import React, { useState } from 'react';

const formatNumber = (num: number, decimals = 2) => {
  if (isNaN(num) || num === null) return '';
  return num.toLocaleString(undefined, { maximumFractionDigits: decimals });
};

const WhatIfQuoteBreakdownPage: React.FC = () => {
  const [baseCpi, setBaseCpi] = useState('');
  const [markup, setMarkup] = useState('20');
  const [discount, setDiscount] = useState('0');
  const [buffer, setBuffer] = useState('0');
  const [completes, setCompletes] = useState('');

  // Parse numbers
  const numBaseCpi = parseFloat(baseCpi);
  const numMarkup = parseFloat(markup);
  const numDiscount = parseFloat(discount);
  const numBuffer = parseFloat(buffer);
  const numCompletes = parseFloat(completes);

  // Step-by-step calculations
  const cpiWithMarkup = numBaseCpi * (1 + numMarkup / 100);
  const cpiWithBuffer = cpiWithMarkup * (1 + numBuffer / 100);
  const quotedCpi = cpiWithBuffer * (1 - numDiscount / 100);
  const quotedTotal = quotedCpi * (numCompletes || 0);

  // Scenario toggles
  const handleMarkupSlider = (v: number) => setMarkup(v.toString());
  const handleDiscountSlider = (v: number) => setDiscount(v.toString());
  const handleBufferSlider = (v: number) => setBuffer(v.toString());
  const handleVendorCpiStepper = (v: number) => setBaseCpi(v.toString());
  const handleQuickDiscount = () => setDiscount('10');

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Quote Impact Breakdown</h2>
      <p className="mb-4 text-gray-600">See where the cost comes from. Adjust mark-up, discount, buffer, and vendor CPI to see instant impact on your quote.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Base CPI ($)</label>
          <input type="number" min="0" step="0.01" value={baseCpi} onChange={e => setBaseCpi(e.target.value)} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mark-up %</label>
          <input type="number" min="0" max="100" step="0.01" value={markup} onChange={e => setMarkup(e.target.value)} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Discount %</label>
          <input type="number" min="0" max="100" step="0.01" value={discount} onChange={e => setDiscount(e.target.value)} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Buffer/Overhead %</label>
          <input type="number" min="0" max="100" step="0.01" value={buffer} onChange={e => setBuffer(e.target.value)} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Completes (N)</label>
          <input type="number" min="0" step="1" value={completes} onChange={e => setCompletes(e.target.value)} className="border rounded px-3 py-2 w-full" />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Mark-up Scenario</label>
          <input type="range" min="0" max="100" step="0.1" value={markup} onChange={e => handleMarkupSlider(Number(e.target.value))} className="w-full" />
          <div className="text-xs text-gray-600">{markup}%</div>
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Discount Scenario</label>
          <input type="range" min="0" max="100" step="0.1" value={discount} onChange={e => handleDiscountSlider(Number(e.target.value))} className="w-full" />
          <div className="text-xs text-gray-600">{discount}%</div>
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Vendor CPI Stepper</label>
          <div className="flex items-center gap-2">
            <button onClick={() => handleVendorCpiStepper((numBaseCpi || 0) - 0.5)} className="px-2 py-1 bg-gray-100 rounded">-0.5</button>
            <span className="text-base">{baseCpi || 0}</span>
            <button onClick={() => handleVendorCpiStepper((numBaseCpi || 0) + 0.5)} className="px-2 py-1 bg-gray-100 rounded">+0.5</button>
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Quick Discount</label>
          <button onClick={handleQuickDiscount} className="w-full px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Apply 10% Discount</button>
        </div>
      </div>
      <div className="mt-4 text-lg font-semibold text-gray-800">
        <div>Base CPI: <span className="text-blue-700">${formatNumber(numBaseCpi)}</span></div>
        <div>+ Mark-up ({markup}%): <span className="text-blue-700">${formatNumber(cpiWithMarkup)}</span></div>
        <div>+ Buffer ({buffer}%): <span className="text-blue-700">${formatNumber(cpiWithBuffer)}</span></div>
        <div>- Discount ({discount}%): <span className="text-blue-700">${formatNumber(quotedCpi)}</span></div>
        <div className="mt-2">Quoted CPI: <span className="text-green-700 font-bold">${formatNumber(quotedCpi)}</span></div>
        <div>Quoted Total ({completes || 0} completes): <span className="text-green-700 font-bold">${formatNumber(quotedTotal)}</span></div>
      </div>
      <div className="mt-6 text-base text-gray-700">
        <div className="mb-1 font-semibold">Formulas:</div>
        <ul className="list-disc list-inside space-y-1">
          <li><b>CPI with Mark-up</b> = Base CPI × (1 + Mark-up % / 100)</li>
          <li><b>CPI with Buffer</b> = CPI with Mark-up × (1 + Buffer % / 100)</li>
          <li><b>Quoted CPI</b> = CPI with Buffer × (1 - Discount % / 100)</li>
          <li><b>Quoted Total</b> = Quoted CPI × Completes</li>
        </ul>
      </div>
    </div>
  );
};

export default WhatIfQuoteBreakdownPage; 