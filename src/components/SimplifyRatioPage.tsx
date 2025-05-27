import { useState } from 'react';

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

const SimplifyRatioPage = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const numA = parseFloat(a);
  const numB = parseFloat(b);
  let simplified = '';
  let fraction = '';
  let divisor = 1;

  if (!isNaN(numA) && !isNaN(numB) && numA !== 0 && numB !== 0) {
    divisor = gcd(numA, numB);
    simplified = `${numA / divisor}:${numB / divisor}`;
    fraction = `${numA / divisor} / ${numB / divisor}`;
  }

  const handleSwap = () => {
    setA(b);
    setB(a);
    setIsReversed(!isReversed);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Simplify Ratio / Fraction</h2>
      <p className="mb-4 text-gray-600">Input two numbers to get the simplest ratio and fraction. Shows the GCD used for simplification. Swap to reverse order.</p>
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
      {simplified && (
        <div className="space-y-2">
          <div><strong>Simplified Ratio (A:B):</strong> {simplified}</div>
          <div><strong>Fraction:</strong> {fraction}</div>
          <div><strong>GCD:</strong> {divisor}</div>
        </div>
      )}
    </div>
  );
};

export default SimplifyRatioPage; 