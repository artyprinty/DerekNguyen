import React from 'react';
import { usePersistentForm } from '../hooks/usePersistentForm';

const formatNumber = (num: number, decimals = 2) => {
  if (isNaN(num) || num === null) return '';
  return num.toLocaleString(undefined, { maximumFractionDigits: decimals });
};

const breakdownOptions = [
  { label: 'Annual', value: 'annual' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Daily', value: 'daily' },
];

interface RevenueFormData {
  lastYear: string;
  thisYear: string;
  startDate: string;
  endDate: string;
  sellingDays: string;
  ytdRevenue: string;
  breakdown: string;
}

const defaultValues: RevenueFormData = {
  lastYear: '',
  thisYear: '',
  startDate: '',
  endDate: '',
  sellingDays: '',
  ytdRevenue: '',
  breakdown: 'monthly'
};

const RevenueForecastPage: React.FC = () => {
  const { formData, setFormData, resetForm } = usePersistentForm<RevenueFormData>({
    key: 'revenue-forecast-dashboard',
    defaultValues,
    onError: (error) => {
      console.error('Error with form persistence:', error);
      // You could add a toast notification here
    }
  });

  const {
    lastYear,
    thisYear,
    startDate,
    endDate,
    sellingDays,
    ytdRevenue,
    breakdown
  } = formData;

  const numLastYear = parseFloat(lastYear);
  const numThisYear = parseFloat(thisYear);
  const numSellingDays = parseFloat(sellingDays);
  const numYtdRevenue = parseFloat(ytdRevenue);

  // Date calculations
  const getDaysBetween = (start: string, end: string) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return 0;
    return Math.max(1, Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1);
  };
  const totalDays = getDaysBetween(startDate, endDate);

  // Outputs
  const yoyGrowth = numLastYear ? ((numThisYear - numLastYear) / numLastYear) * 100 : null;
  const gap = numThisYear - numLastYear;
  const dailyGoal = numSellingDays ? numThisYear / numSellingDays : null;
  const quarterlyGoal = numThisYear / 4;
  const monthlyGoal = numThisYear / 12;
  const percentToGoal = numThisYear ? (numYtdRevenue / numThisYear) * 100 : null;
  
  // Pace vs plan
  let elapsedSellingDays = 0;
  if (startDate && endDate && numSellingDays) {
    const now = new Date();
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (now >= s && now <= e) {
      const total = getDaysBetween(startDate, endDate);
      const elapsed = Math.floor((now.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      elapsedSellingDays = Math.round((elapsed / total) * numSellingDays);
    }
  }
  const pace = elapsedSellingDays ? numYtdRevenue / elapsedSellingDays : null;
  const paceVsPlan = (dailyGoal && pace !== null) ? (pace / dailyGoal) * 100 : null;

  // Breakdown label
  const breakdownLabel = breakdownOptions.find(opt => opt.value === breakdown)?.label;
  const breakdownValue =
    breakdown === 'annual' ? numThisYear :
    breakdown === 'quarterly' ? quarterlyGoal :
    breakdown === 'monthly' ? monthlyGoal :
    breakdown === 'daily' ? dailyGoal : null;

  const handleInputChange = (field: keyof RevenueFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Revenue Forecast Dashboard</h2>
          <p className="text-gray-600">Enter your revenue targets and see live breakdowns, growth, and pace vs. plan.</p>
        </div>
        <button
          onClick={resetForm}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
        >
          Reset Form
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Year Revenue ($)</label>
          <input 
            type="number" 
            value={lastYear} 
            onChange={e => handleInputChange('lastYear', e.target.value)} 
            className="border rounded px-3 py-2 w-full" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">This Year Target Revenue ($)</label>
          <input 
            type="number" 
            value={thisYear} 
            onChange={e => handleInputChange('thisYear', e.target.value)} 
            className="border rounded px-3 py-2 w-full" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={e => handleInputChange('startDate', e.target.value)} 
            className="border rounded px-3 py-2 w-full" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={e => handleInputChange('endDate', e.target.value)} 
            className="border rounded px-3 py-2 w-full" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Selling Days</label>
          <input 
            type="number" 
            value={sellingDays} 
            onChange={e => handleInputChange('sellingDays', e.target.value)} 
            className="border rounded px-3 py-2 w-full" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">YTD Revenue (optional)</label>
          <input 
            type="number" 
            value={ytdRevenue} 
            onChange={e => handleInputChange('ytdRevenue', e.target.value)} 
            className="border rounded px-3 py-2 w-full" 
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Breakdown by</label>
          <select 
            value={breakdown} 
            onChange={e => handleInputChange('breakdown', e.target.value)} 
            className="border rounded px-3 py-2 w-full"
          >
            {breakdownOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 rounded mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left font-semibold">Metric</th>
              <th className="py-2 px-4 text-left font-semibold">Value</th>
              <th className="py-2 px-4 text-left font-semibold">Formula</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="py-2 px-4 font-medium">YoY Growth %</td>
              <td className="py-2 px-4 text-base text-gray-700">{yoyGrowth !== null ? formatNumber(yoyGrowth, 2) + '%' : '--'}</td>
              <td className="py-2 px-4 text-base text-gray-600">(This Year - Last Year) / Last Year × 100</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-2 px-4 font-medium">Revenue Gap</td>
              <td className="py-2 px-4 text-base text-gray-700">{gap ? '$' + formatNumber(gap, 2) : '--'}</td>
              <td className="py-2 px-4 text-base text-gray-600">This Year - Last Year</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-2 px-4 font-medium">{breakdownLabel} Goal</td>
              <td className="py-2 px-4 text-base text-gray-700">{breakdownValue ? '$' + formatNumber(breakdownValue, 2) : '--'}</td>
              <td className="py-2 px-4 text-base text-gray-600">This Year / {breakdown === 'annual' ? '1' : breakdown === 'quarterly' ? '4' : breakdown === 'monthly' ? '12' : 'Selling Days'}</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-2 px-4 font-medium">% to Goal (YTD)</td>
              <td className="py-2 px-4 text-base text-gray-700">{percentToGoal !== null ? formatNumber(percentToGoal, 2) + '%' : '--'}</td>
              <td className="py-2 px-4 text-base text-gray-600">YTD Revenue / This Year × 100</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-2 px-4 font-medium">Pace vs Plan</td>
              <td className="py-2 px-4 text-base text-gray-700">{paceVsPlan !== null ? formatNumber(paceVsPlan, 2) + '%' : '--'}</td>
              <td className="py-2 px-4 text-base text-gray-600">(YTD Revenue / Elapsed Selling Days) / Daily Goal × 100</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-base text-gray-700">
        <div className="mb-1 font-semibold">Formulas:</div>
        <ul className="list-disc list-inside space-y-1">
          <li><b>YoY Growth %</b> = (This Year - Last Year) / Last Year × 100</li>
          <li><b>Revenue Gap</b> = This Year - Last Year</li>
          <li><b>Daily Goal</b> = This Year / Selling Days</li>
          <li><b>Quarterly Goal</b> = This Year / 4</li>
          <li><b>Monthly Goal</b> = This Year / 12</li>
          <li><b>% to Goal</b> = YTD Revenue / This Year × 100</li>
          <li><b>Pace vs Plan</b> = (YTD Revenue / Elapsed Selling Days) / Daily Goal × 100</li>
        </ul>
      </div>
    </div>
  );
};

export default RevenueForecastPage; 