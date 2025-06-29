import { useState } from 'react';

const MarkupMarginPage = () => {
  const [cost, setCost] = useState('');
  const [sell, setSell] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const numCost = parseFloat(cost);
  const numSell = parseFloat(sell);
  let markup = '';
  let margin = '';

  if (!isNaN(numCost) && !isNaN(numSell) && numCost !== 0 && numSell !== 0) {
    markup = (((numSell - numCost) / numCost) * 100).toFixed(2) + '%';
    margin = (((numSell - numCost) / numSell) * 100).toFixed(2) + '%';
  }

  const handleSwap = () => {
    setCost(sell);
    setSell(cost);
    setIsReversed(!isReversed);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Mark-up vs Margin Calculator</h2>
      <p className="mb-4 text-gray-600">Input Cost and Sell Price to get Mark-up % and Gross Margin %.</p>
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{isReversed ? 'Sell Price' : 'Cost'}</label>
          <input type="number" value={cost} onChange={e => setCost(e.target.value)} placeholder={isReversed ? 'Sell Price' : 'Cost'} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{isReversed ? 'Cost' : 'Sell Price'}</label>
          <input type="number" value={sell} onChange={e => setSell(e.target.value)} placeholder={isReversed ? 'Cost' : 'Sell Price'} className="border rounded px-3 py-2 w-full" />
        </div>
        <button onClick={handleSwap} className="text-blue-600 px-2">⇄</button>
      </div>
      <div className="space-y-2">
        <div><strong>Mark-up %:</strong> {markup}</div>
        <div><strong>Gross Margin %:</strong> {margin}</div>
      </div>
    </div>
  );
};

export default MarkupMarginPage; 