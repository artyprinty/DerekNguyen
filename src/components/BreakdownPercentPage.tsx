import { useState } from 'react';

const BreakdownPercentPage = () => {
  const [total, setTotal] = useState('');
  const [percents, setPercents] = useState<string[]>(['']);
  const [isReversed, setIsReversed] = useState(false);

  const numTotal = parseFloat(total);
  const percentValues = percents.map(p => parseFloat(p));
  const validPercents = percentValues.every(p => !isNaN(p));
  const sumPercents = percentValues.reduce((a, b) => a + (isNaN(b) ? 0 : b), 0);

  const handlePercentChange = (idx: number, value: string) => {
    setPercents(arr => arr.map((p, i) => (i === idx ? value : p)));
  };

  const addRow = () => setPercents(arr => [...arr, '']);
  const removeRow = (idx: number) => setPercents(arr => arr.length > 1 ? arr.filter((_, i) => i !== idx) : arr);

  const handleSwap = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Breakdown Total into % Parts</h2>
      <p className="mb-4 text-gray-600">Input a total and percentages to see the value of each part. All percentages should add up to 100% for a full breakdown.</p>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{isReversed ? 'Percentages' : 'Total'}</label>
        <input type="number" value={total} onChange={e => setTotal(e.target.value)} placeholder={isReversed ? 'Percentages' : 'Total'} className="border rounded px-3 py-2 w-full mb-2" />
      </div>
      <div className="mb-4 space-y-2">
        {percents.map((p, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input type="number" value={p} onChange={e => handlePercentChange(i, e.target.value)} placeholder="%" className="border rounded px-3 py-2 w-1/2" />
            <span className="w-1/2">{!isNaN(percentValues[i]) && !isNaN(numTotal) ? ((numTotal * percentValues[i] / 100).toFixed(2)) : ''}</span>
            <button onClick={() => removeRow(i)} className="text-red-500 px-2">✕</button>
          </div>
        ))}
        <button onClick={addRow} className="text-blue-600 mt-2">+ Add Row</button>
      </div>
      <div className="mb-2 text-gray-600">Sum of %: {sumPercents}%</div>
      {!validPercents && <div className="text-red-500">Please enter valid percentages for all rows.</div>}
      {sumPercents !== 100 && <div className="text-yellow-600">Warning: Percentages do not sum to 100%.</div>}
      <button onClick={handleSwap} className="text-blue-600 mt-2">⇄</button>
    </div>
  );
};

export default BreakdownPercentPage; 