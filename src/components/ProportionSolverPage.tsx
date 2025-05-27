import { useState } from 'react';

const ProportionSolverPage = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  let result = '';
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  const numC = parseFloat(c);
  const numD = parseFloat(d);

  // Solve for missing value if only one is blank
  const filled = [a, b, c, d].filter(x => x !== '').length;
  if (filled === 3) {
    if (a === '') result = ((numB * numC) / numD).toFixed(4);
    else if (b === '') result = ((numA * numD) / numC).toFixed(4);
    else if (c === '') result = ((numA * numD) / numB).toFixed(4);
    else if (d === '') result = ((numB * numC) / numA).toFixed(4);
  }

  const handleSwap = () => {
    setA(b);
    setB(a);
    setC(d);
    setD(c);
    setIsReversed(!isReversed);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Proportion Solver</h2>
      <p className="mb-4 text-gray-600">Input A, B, and C to solve for D in the proportion A/B = C/D. Leave one field blank to solve for it.</p>
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
          <label className="block text-sm font-medium text-gray-700">{isReversed ? 'D' : 'C'}</label>
          <input type="number" value={c} onChange={e => setC(e.target.value)} placeholder={isReversed ? 'D' : 'C'} className="border rounded px-3 py-2 w-full" />
        </div>
        <span className="self-center">/</span>
        <div>
          <label className="block text-sm font-medium text-gray-700">{isReversed ? 'C' : 'D'}</label>
          <input type="number" value={d} onChange={e => setD(e.target.value)} placeholder={isReversed ? 'C' : 'D'} className="border rounded px-3 py-2 w-full" />
        </div>
        <button onClick={handleSwap} className="text-blue-600 px-2">⇄</button>
      </div>
      {result && (
        <div className="space-y-2">
          <div><strong>Solved Value:</strong> {result}</div>
        </div>
      )}
    </div>
  );
};

export default ProportionSolverPage; 