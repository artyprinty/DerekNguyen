import { useState } from 'react';

const ReversePercentPage = () => {
  const [finalValue, setFinalValue] = useState('');
  const [percent, setPercent] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const numFinal = parseFloat(finalValue);
  const numPercent = parseFloat(percent);
  let original = '';

  if (!isNaN(numFinal) && !isNaN(numPercent)) {
    original = (numFinal / (1 + numPercent / 100)).toFixed(4);
  }

  const handleSwap = () => {
    setFinalValue(percent);
    setPercent(finalValue);
    setIsReversed(!isReversed);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Reverse % Calculator</h2>
      <p className="mb-4 text-gray-600">If you know the final value and the percent increase, calculate the original value. Formula: Original = Final / (1 + percent/100)</p>
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{isReversed ? 'Percent' : 'Final Value'}</label>
          <input type="number" value={finalValue} onChange={e => setFinalValue(e.target.value)} placeholder={isReversed ? 'Percent' : 'Final Value'} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{isReversed ? 'Final Value' : 'Percent'}</label>
          <input type="number" value={percent} onChange={e => setPercent(e.target.value)} placeholder={isReversed ? 'Final Value' : 'Percent'} className="border rounded px-3 py-2 w-full" />
        </div>
        <button onClick={handleSwap} className="text-blue-600 px-2">⇄</button>
      </div>
      <div className="space-y-2">
        <div><strong>Original Value:</strong> {original}</div>
      </div>
    </div>
  );
};

export default ReversePercentPage; 