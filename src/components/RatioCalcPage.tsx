import { useState } from 'react';

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

const RatioCalcPage = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');

  const numA = parseFloat(a);
  const numB = parseFloat(b);
  let simplified = '';
  let reverse = '';
  let percent = '';

  if (!isNaN(numA) && !isNaN(numB) && numA !== 0 && numB !== 0) {
    const divisor = gcd(numA, numB);
    simplified = `${numA / divisor}:${numB / divisor}`;
    reverse = `${numB / divisor}:${numA / divisor}`;
    percent = `${((numA / numB) * 100).toFixed(2)}%`;
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Ratio Calculator</h2>
      <p className="mb-4 text-gray-600">Input A and B to get the simplified ratio, reverse ratio, and percentage form (A is X% of B).</p>
      <div className="flex gap-4 mb-4">
        <input type="number" value={a} onChange={e => setA(e.target.value)} placeholder="A" className="border rounded px-3 py-2 w-1/2" />
        <input type="number" value={b} onChange={e => setB(e.target.value)} placeholder="B" className="border rounded px-3 py-2 w-1/2" />
      </div>
      {simplified && (
        <div className="space-y-2">
          <div><strong>Simplified Ratio (A:B):</strong> {simplified}</div>
          <div><strong>Reverse Ratio (B:A):</strong> {reverse}</div>
          <div><strong>Percentage (A is X% of B):</strong> {percent}</div>
        </div>
      )}
    </div>
  );
};

export default RatioCalcPage; 