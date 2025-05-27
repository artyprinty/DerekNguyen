import { useState } from 'react';

const PercentChangePage = () => {
  const [oldValue, setOldValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const oldNum = parseFloat(oldValue);
  const newNum = parseFloat(newValue);
  let percentChange = '';
  let label = '';
  let barPercent = 0;

  if (!isNaN(oldNum) && !isNaN(newNum) && oldNum !== 0) {
    const change = newNum - oldNum;
    const percent = (change / oldNum) * 100;
    percentChange = percent.toFixed(2) + '%';
    label = percent > 0 ? '↑ Increase' : percent < 0 ? '↓ Decrease' : 'No Change';
    barPercent = Math.abs(percent);
  }

  const handleSwap = () => {
    setOldValue(newValue);
    setNewValue(oldValue);
    setIsReversed(!isReversed);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Percentage Increase / Decrease</h2>
      <p className="mb-4 text-gray-600">Input Old and New values to get the percent change, labeled as increase or decrease, with a visual bar fill.</p>
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{isReversed ? 'New' : 'Old'}</label>
          <input type="number" value={oldValue} onChange={e => setOldValue(e.target.value)} placeholder={isReversed ? 'New' : 'Old'} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{isReversed ? 'Old' : 'New'}</label>
          <input type="number" value={newValue} onChange={e => setNewValue(e.target.value)} placeholder={isReversed ? 'Old' : 'New'} className="border rounded px-3 py-2 w-full" />
        </div>
        <button onClick={handleSwap} className="text-blue-600 px-2">⇄</button>
      </div>
      {percentChange && (
        <div className="space-y-2">
          <div><strong>Percent Change:</strong> {percentChange} <span className={label.includes('Increase') ? 'text-green-600' : label.includes('Decrease') ? 'text-red-600' : ''}>{label}</span></div>
          <div className="w-full bg-gray-200 rounded h-4">
            <div className={`h-4 rounded ${label.includes('Increase') ? 'bg-green-400' : label.includes('Decrease') ? 'bg-red-400' : 'bg-gray-400'}`} style={{ width: `${Math.min(barPercent, 100)}%` }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PercentChangePage; 