import { useState } from 'react';

const SpeedRatePage = () => {
  const [speed, setSpeed] = useState('');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  let calculatedSpeed = '';
  let calculatedDistance = '';
  let calculatedTime = '';

  // Calculate missing value based on the other two inputs
  if (speed && distance && !time) {
    const numSpeed = parseFloat(speed);
    const numDistance = parseFloat(distance);
    if (!isNaN(numSpeed) && !isNaN(numDistance) && numSpeed !== 0) {
      calculatedTime = (numDistance / numSpeed).toFixed(2);
    }
  } else if (speed && !distance && time) {
    const numSpeed = parseFloat(speed);
    const numTime = parseFloat(time);
    if (!isNaN(numSpeed) && !isNaN(numTime)) {
      calculatedDistance = (numSpeed * numTime).toFixed(2);
    }
  } else if (!speed && distance && time) {
    const numDistance = parseFloat(distance);
    const numTime = parseFloat(time);
    if (!isNaN(numDistance) && !isNaN(numTime) && numTime !== 0) {
      calculatedSpeed = (numDistance / numTime).toFixed(2);
    }
  }

  const handleSwap = () => {
    setSpeed(distance);
    setDistance(speed);
    setIsReversed(!isReversed);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Speed/Rate Calculator</h2>
      <p className="mb-4 text-gray-600">Calculate speed, distance, or time. Leave one field blank to calculate it.</p>
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{isReversed ? 'Distance' : 'Speed'}</label>
          <input 
            type="number" 
            value={speed} 
            onChange={e => setSpeed(e.target.value)} 
            placeholder={isReversed ? 'Distance' : 'Speed'} 
            className="border rounded px-3 py-2 w-full" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{isReversed ? 'Speed' : 'Distance'}</label>
          <input 
            type="number" 
            value={distance} 
            onChange={e => setDistance(e.target.value)} 
            placeholder={isReversed ? 'Speed' : 'Distance'} 
            className="border rounded px-3 py-2 w-full" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input 
            type="number" 
            value={time} 
            onChange={e => setTime(e.target.value)} 
            placeholder="Time" 
            className="border rounded px-3 py-2 w-full" 
          />
        </div>
        <button onClick={handleSwap} className="text-blue-600 px-2">⇄</button>
      </div>
      {(calculatedSpeed || calculatedDistance || calculatedTime) && (
        <div className="space-y-2">
          {calculatedSpeed && <div><strong>Calculated Speed:</strong> {calculatedSpeed}</div>}
          {calculatedDistance && <div><strong>Calculated Distance:</strong> {calculatedDistance}</div>}
          {calculatedTime && <div><strong>Calculated Time:</strong> {calculatedTime}</div>}
        </div>
      )}
    </div>
  );
};

export default SpeedRatePage; 