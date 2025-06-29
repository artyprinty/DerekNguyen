import { useState } from 'react';

const RuleOfThreePage = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const numA = parseFloat(a);
  const numB = parseFloat(b);
  const numC = parseFloat(c);
  let result = '';

  if (!isNaN(numA) && !isNaN(numB) && !isNaN(numC) && numB !== 0) {
    result = ((numC * numB) / numA).toFixed(4);
  }

  const handleSwap = () => {
    setA(b);
    setB(a);
    setIsReversed(!isReversed);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Rule of 3 Calculator</h2>
      <p className="mb-4 text-gray-600">Input A, B, and C to solve for D in the proportion A/B = C/D. Formula: D = (C * B) / A</p>
      <div className="flex gap-2 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{isReversed ? 'B' : 'A'}</label>
          <input type="number" value={a} onChange={e => setA(e.target.value)} placeholder={isReversed ? 'B' : 'A'} className="border rounded px-3 py-2 w-full" />
        </div>
        <span className="self-center">/</span>
        <div>
          <label className="block text-sm font-medium text-gray-700">{isReversed ? 'A' : 'B'}</label>
          <input type="number" value={b} onChange={e => setB(e.target.value)} placeholder={isReversed ? 'A' : 'B'} className="border rounded px-3 py-2 w-full" />
        </div>
        <span className="self-center">=</span>
        <div>
          <label className="block text-sm font-medium text-gray-700">C</label>
          <input type="number" value={c} onChange={e => setC(e.target.value)} placeholder="C" className="border rounded px-3 py-2 w-full" />
        </div>
        <span className="self-center">/</span>
        <span className="self-center">D</span>
        <button onClick={handleSwap} className="text-blue-600 px-2">⇄</button>
      </div>
      <div className="space-y-2">
        <div><strong>D:</strong> {result}</div>
      </div>
    </div>
  );
};

export default RuleOfThreePage; 