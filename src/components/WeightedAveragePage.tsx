import { useState } from 'react';

const WeightedAveragePage = () => {
  const [rows, setRows] = useState([{ value: '', weight: '' }]);
  const [isReversed, setIsReversed] = useState(false);

  const handleChange = (idx: number, field: 'value' | 'weight', val: string) => {
    setRows(arr => arr.map((row, i) => i === idx ? { ...row, [field]: val } : row));
  };

  const addRow = () => setRows(arr => [...arr, { value: '', weight: '' }]);
  const removeRow = (idx: number) => setRows(arr => arr.length > 1 ? arr.filter((_, i) => i !== idx) : arr);

  const values = rows.map(r => parseFloat(r.value));
  const weights = rows.map(r => parseFloat(r.weight));
  const valid = values.every(v => !isNaN(v)) && weights.every(w => !isNaN(w));
  const totalWeight = weights.reduce((a, b) => a + (isNaN(b) ? 0 : b), 0);
  const weightedSum = rows.reduce((sum, row) => {
    const v = parseFloat(row.value);
    const w = parseFloat(row.weight);
    return sum + (isNaN(v) || isNaN(w) ? 0 : v * w);
  }, 0);
  const weightedAvg = valid && totalWeight !== 0 ? (weightedSum / totalWeight).toFixed(4) : '';

  const handleSwap = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Weighted Average Calculator</h2>
      <p className="mb-4 text-gray-600">Input value/weight pairs to calculate the weighted average. Add or remove rows as needed.</p>
      <div className="mb-4 space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="flex gap-2 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700">{isReversed ? 'Weight' : 'Value'}</label>
              <input type="number" value={row.value} onChange={e => handleChange(i, 'value', e.target.value)} placeholder={isReversed ? 'Weight' : 'Value'} className="border rounded px-3 py-2 w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{isReversed ? 'Value' : 'Weight'}</label>
              <input type="number" value={row.weight} onChange={e => handleChange(i, 'weight', e.target.value)} placeholder={isReversed ? 'Value' : 'Weight'} className="border rounded px-3 py-2 w-full" />
            </div>
            <button onClick={() => removeRow(i)} className="text-red-500 px-2">✕</button>
          </div>
        ))}
        <button onClick={addRow} className="text-blue-600 mt-2">+ Add Row</button>
      </div>
      <div className="mb-2 text-gray-600">Total Weight: {totalWeight}</div>
      {valid && weightedAvg && (
        <div className="space-y-2">
          <div><strong>Weighted Average:</strong> {weightedAvg}</div>
        </div>
      )}
      {!valid && <div className="text-red-500">Please enter valid numbers for all values and weights.</div>}
      <button onClick={handleSwap} className="text-blue-600 mt-2">⇄</button>
    </div>
  );
};

export default WeightedAveragePage; 