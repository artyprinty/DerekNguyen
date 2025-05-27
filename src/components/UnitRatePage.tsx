import { useState } from 'react';

const UnitRatePage = () => {
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const numQuantity = parseFloat(quantity);
  const numUnit = parseFloat(unit);
  let unitRate = '';

  if (!isNaN(numQuantity) && !isNaN(numUnit) && numUnit !== 0) {
    unitRate = (numQuantity / numUnit).toFixed(4);
  }

  const handleSwap = () => {
    setQuantity(unit);
    setUnit(quantity);
    setIsReversed(!isReversed);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Unit Rate Calculator</h2>
      <p className="mb-4 text-gray-600">Input a quantity and a unit to calculate the unit rate. Swap to reverse the order.</p>
      <div className="mb-4">
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{isReversed ? 'Unit' : 'Quantity'}</label>
            <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder={isReversed ? 'Unit' : 'Quantity'} className="border rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{isReversed ? 'Quantity' : 'Unit'}</label>
            <input type="number" value={unit} onChange={e => setUnit(e.target.value)} placeholder={isReversed ? 'Quantity' : 'Unit'} className="border rounded px-3 py-2 w-full" />
          </div>
          <button onClick={handleSwap} className="text-blue-600 px-2">⇄</button>
        </div>
      </div>
      {unitRate && (
        <div className="space-y-2">
          <div><strong>Unit Rate:</strong> {unitRate}</div>
        </div>
      )}
    </div>
  );
};

export default UnitRatePage; 