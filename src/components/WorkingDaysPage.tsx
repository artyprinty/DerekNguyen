import { useState } from 'react';

const WorkingDaysPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const calculateWorkingDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    let count = 0;
    const curDate = new Date(startDate.getTime());
    
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  };

  let workingDays = '';
  let totalDays = '';
  let weekendDays = '';

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const total = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      const working = calculateWorkingDays(startDate, endDate);
      workingDays = working.toString();
      totalDays = total.toString();
      weekendDays = (total - working).toString();
    }
  }

  const handleSwap = () => {
    setStartDate(endDate);
    setEndDate(startDate);
    setIsReversed(!isReversed);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Working Days Calculator</h2>
      <p className="mb-4 text-gray-600">Calculate the number of working days between two dates, excluding weekends.</p>
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{isReversed ? 'End Date' : 'Start Date'}</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={e => setStartDate(e.target.value)} 
            className="border rounded px-3 py-2 w-full" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{isReversed ? 'Start Date' : 'End Date'}</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={e => setEndDate(e.target.value)} 
            className="border rounded px-3 py-2 w-full" 
          />
        </div>
        <button onClick={handleSwap} className="text-blue-600 px-2">⇄</button>
      </div>
      {workingDays && (
        <div className="space-y-2">
          <div><strong>Working Days:</strong> {workingDays}</div>
          <div><strong>Total Days:</strong> {totalDays}</div>
          <div><strong>Weekend Days:</strong> {weekendDays}</div>
        </div>
      )}
    </div>
  );
};

export default WorkingDaysPage; 