import { useState } from 'react';

const DifferenceCalculatorPage = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const numA = parseFloat(a);
  const numB = parseFloat(b);
  let absDiff = '';
  let dirDiff = '';
  let percentDiff = '';

  if (!isNaN(numA) && !isNaN(numB)) {
    absDiff = Math.abs(numA - numB).toString();
    dirDiff = (numA - numB).toString();
    percentDiff = numB !== 0 ? ((Math.abs(numA - numB) / Math.abs(numB)) * 100).toFixed(2) + '%' : '';
  }

  const handleSwap = () => {
    setA(b);
    setB(a);
    setIsReversed(!isReversed);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Difference Calculator</h2>
      <p className="mb-4 text-gray-600">Input A and B to get the absolute difference, directional difference (A - B), and percent difference.</p>
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{isReversed ? 'B' : 'A'}</label>
          <input type="number" value={a} onChange={e => setA(e.target.value)} placeholder={isReversed ? 'B' : 'A'} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{isReversed ? 'A' : 'B'}</label>
          <input type="number" value={b} onChange={e => setB(e.target.value)} placeholder={isReversed ? 'A' : 'B'} className="border rounded px-3 py-2 w-full" />
        </div>
        <button onClick={handleSwap} className="text-blue-600 px-2">⇄</button>
      </div>
      <div className="space-y-2">
        <div><strong>Absolute Difference:</strong> {absDiff}</div>
        <div><strong>Directional (A - B):</strong> {dirDiff}</div>
        <div><strong>Percent Difference:</strong> {percentDiff}</div>
      </div>
    </div>
  );
};

export default DifferenceCalculatorPage; 