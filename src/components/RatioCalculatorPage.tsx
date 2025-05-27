import { useState } from 'react';

const RatioCalculatorPage = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const numA = parseFloat(a);
  const numB = parseFloat(b);
  let ratio = '';
  let simplified = '';

  if (!isNaN(numA) && !isNaN(numB) && numB !== 0) {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(Math.abs(numA), Math.abs(numB));
    ratio = `${numA}:${numB}`;
    simplified = `${Math.round(numA / divisor)}:${Math.round(numB / divisor)}`;
  }

  const handleSwap = () => {
    setA(b);
    setB(a);
    setIsReversed(!isReversed);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Ratio Calculator</h2>
      <p className="mb-4 text-gray-600">Input A and B to get the ratio and simplified ratio.</p>
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
      {ratio && (
        <div className="space-y-2">
          <div><strong>Ratio:</strong> {ratio}</div>
          <div><strong>Simplified:</strong> {simplified}</div>
        </div>
      )}
    </div>
  );
};

export default RatioCalculatorPage; 