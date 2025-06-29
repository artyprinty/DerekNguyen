import { useState } from 'react';

const PercentOfTotalPage = () => {
  const [part, setPart] = useState('');
  const [whole, setWhole] = useState('');
  const [percent, setPercent] = useState('');
  const [reverseMode, setReverseMode] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  let result = '';
  let autoPart = '';

  if (!reverseMode) {
    const numPart = parseFloat(part);
    const numWhole = parseFloat(whole);
    if (!isNaN(numPart) && !isNaN(numWhole) && numWhole !== 0) {
      result = ((numPart / numWhole) * 100).toFixed(2) + '%';
    }
  } else {
    const numPercent = parseFloat(percent);
    const numWhole = parseFloat(whole);
    if (!isNaN(numPercent) && !isNaN(numWhole)) {
      autoPart = ((numPercent / 100) * numWhole).toFixed(2);
    }
  }

  const handleSwap = () => {
    setPart(whole);
    setWhole(part);
    setIsReversed(!isReversed);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Percent of Total</h2>
      <p className="mb-4 text-gray-600">Input Part and Whole to get the percent. Reverse mode: input % and Whole to auto-fill Part.</p>
      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={reverseMode} onChange={() => setReverseMode(r => !r)} />
          Reverse mode
        </label>
      </div>
      {!reverseMode ? (
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{isReversed ? 'Whole' : 'Part'}</label>
            <input type="number" value={part} onChange={e => setPart(e.target.value)} placeholder={isReversed ? 'Whole' : 'Part'} className="border rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{isReversed ? 'Part' : 'Whole'}</label>
            <input type="number" value={whole} onChange={e => setWhole(e.target.value)} placeholder={isReversed ? 'Part' : 'Whole'} className="border rounded px-3 py-2 w-full" />
          </div>
          <button onClick={handleSwap} className="text-blue-600 px-2">⇄</button>
        </div>
      ) : (
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Percent</label>
            <input type="number" value={percent} onChange={e => setPercent(e.target.value)} placeholder="Percent" className="border rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Whole</label>
            <input type="number" value={whole} onChange={e => setWhole(e.target.value)} placeholder="Whole" className="border rounded px-3 py-2 w-full" />
          </div>
        </div>
      )}
      <div className="space-y-2">
        {!reverseMode && <div><strong>Percent of Total:</strong> {result}</div>}
        {reverseMode && <div><strong>Part:</strong> {autoPart}</div>}
      </div>
    </div>
  );
};

export default PercentOfTotalPage; 