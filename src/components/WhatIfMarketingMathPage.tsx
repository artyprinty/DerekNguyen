import React from 'react';
import { usePersistentForm } from '../hooks/usePersistentForm';

const formatNumber = (num: number, decimals = 2) => {
  if (isNaN(num) || num === null) return '';
  return num.toLocaleString(undefined, { maximumFractionDigits: decimals });
};

interface MarketingFormData {
  spend: string;
  impressions: string;
  clicks: string;
  conversions: string;
  revenue: string;
}

const defaultValues: MarketingFormData = {
  spend: '',
  impressions: '',
  clicks: '',
  conversions: '',
  revenue: ''
};

const WhatIfMarketingMathPage: React.FC = () => {
  const { formData, setFormData, resetForm } = usePersistentForm<MarketingFormData>({
    key: 'marketing-metrics-dashboard',
    defaultValues,
    onError: (error) => {
      console.error('Error with form persistence:', error);
    }
  });

  const {
    spend,
    impressions,
    clicks,
    conversions,
    revenue
  } = formData;

  const numSpend = parseFloat(spend);
  const numImpressions = parseFloat(impressions);
  const numClicks = parseFloat(clicks);
  const numConversions = parseFloat(conversions);
  const numRevenue = parseFloat(revenue);

  const handleInputChange = (field: keyof MarketingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Derived metrics and calculation examples
  const metrics = [
    {
      label: 'CTR',
      value: numImpressions ? (numClicks / numImpressions) * 100 : null,
      formula: 'CTR=Clicks / Impressions × 100',
      example: numImpressions ? `CTR=${formatNumber(numClicks, 2)} / ${formatNumber(numImpressions, 2)} × 100=${formatNumber((numClicks / numImpressions) * 100, 2)}%` : '--',
      display: numImpressions ? `CTR=${formatNumber((numClicks / numImpressions) * 100, 2)}%` : 'CTR=--',
    },
    {
      label: 'CPC',
      value: numClicks ? numSpend / numClicks : null,
      formula: 'CPC=Spend / Clicks',
      example: numClicks ? `CPC=${formatNumber(numSpend, 2)} / ${formatNumber(numClicks, 2)}=${formatNumber(numSpend / numClicks, 4)}` : '--',
      display: numClicks ? `CPC=$${formatNumber(numSpend / numClicks, 4)}` : 'CPC=--',
    },
    {
      label: 'CPA',
      value: numConversions ? numSpend / numConversions : null,
      formula: 'CPA=Spend / Conversions',
      example: numConversions ? `CPA=${formatNumber(numSpend, 2)} / ${formatNumber(numConversions, 2)}=${formatNumber(numSpend / numConversions, 4)}` : '--',
      display: numConversions ? `CPA=$${formatNumber(numSpend / numConversions, 4)}` : 'CPA=--',
    },
    {
      label: 'Conversion Rate',
      value: numClicks ? (numConversions / numClicks) * 100 : null,
      formula: 'CR=Conversions / Clicks × 100',
      example: numClicks ? `CR=${formatNumber(numConversions, 2)} / ${formatNumber(numClicks, 2)} × 100=${formatNumber((numConversions / numClicks) * 100, 2)}%` : '--',
      display: numClicks ? `CR=${formatNumber((numConversions / numClicks) * 100, 2)}%` : 'CR=--',
    },
    {
      label: 'ROI',
      value: numSpend ? ((numRevenue - numSpend) / numSpend) : null,
      formula: 'ROI=(Revenue - Spend) / Spend',
      example: numSpend ? `ROI=(${formatNumber(numRevenue, 2)} - ${formatNumber(numSpend, 2)}) / ${formatNumber(numSpend, 2)}=${((numRevenue - numSpend) / numSpend * 100).toFixed(2)}%` : '--',
      display: numSpend ? `ROI=${((numRevenue - numSpend) / numSpend * 100).toFixed(2)}%` : 'ROI=--',
    },
    {
      label: 'CPM',
      value: numImpressions ? (numSpend / numImpressions) * 1000 : null,
      formula: 'CPM=Spend / Impressions × 1,000',
      example: numImpressions ? `CPM=${formatNumber(numSpend, 2)} / ${formatNumber(numImpressions, 2)} × 1,000=${formatNumber((numSpend / numImpressions) * 1000, 4)}` : '--',
      display: numImpressions ? `CPM=$${formatNumber((numSpend / numImpressions) * 1000, 4)}` : 'CPM=--',
    },
    {
      label: 'RPM',
      value: numImpressions ? (numRevenue / numImpressions) * 1000 : null,
      formula: 'RPM=Revenue / Impressions × 1,000',
      example: numImpressions ? `RPM=${formatNumber(numRevenue, 2)} / ${formatNumber(numImpressions, 2)} × 1,000=${formatNumber((numRevenue / numImpressions) * 1000, 4)}` : '--',
      display: numImpressions ? `RPM=$${formatNumber((numRevenue / numImpressions) * 1000, 4)}` : 'RPM=--',
    },
  ];

  const metricDescriptions = [
    { label: 'CTR', desc: 'Click-Through Rate: The percentage of impressions that resulted in a click.' },
    { label: 'CPC', desc: 'Cost Per Click: The average amount spent for each click.' },
    { label: 'CPA', desc: 'Cost Per Acquisition: The average cost to acquire a conversion (lead, sale, etc.).' },
    { label: 'CR', desc: 'Conversion Rate: The percentage of clicks that resulted in a conversion.' },
    { label: 'ROI', desc: 'Return on Investment: The percentage return on your spend, after revenue.' },
    { label: 'CPM', desc: 'Cost Per Mille: The cost per 1,000 impressions.' },
    { label: 'RPM', desc: 'Revenue Per Mille: The revenue earned per 1,000 impressions.' },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Marketing Metrics Dashboard</h2>
          <p className="text-gray-600">Edit any input below. All metrics update live.</p>
        </div>
        <button
          onClick={resetForm}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
        >
          Reset Form
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Spend ($)</label>
          <input 
            type="number" 
            value={spend} 
            onChange={e => handleInputChange('spend', e.target.value)} 
            className="border rounded px-3 py-2 w-full" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Impressions</label>
          <input 
            type="number" 
            value={impressions} 
            onChange={e => handleInputChange('impressions', e.target.value)} 
            className="border rounded px-3 py-2 w-full" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Clicks</label>
          <input 
            type="number" 
            value={clicks} 
            onChange={e => handleInputChange('clicks', e.target.value)} 
            className="border rounded px-3 py-2 w-full" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Conversions</label>
          <input 
            type="number" 
            value={conversions} 
            onChange={e => handleInputChange('conversions', e.target.value)} 
            className="border rounded px-3 py-2 w-full" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Revenue ($)</label>
          <input 
            type="number" 
            value={revenue} 
            onChange={e => handleInputChange('revenue', e.target.value)} 
            className="border rounded px-3 py-2 w-full" 
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 rounded">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left font-semibold">Metric</th>
              <th className="py-2 px-4 text-left font-semibold">Formula</th>
              <th className="py-2 px-4 text-left font-semibold">Calculation Example</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map(row => (
              <tr key={row.label} className="border-t border-gray-200">
                <td className="py-2 px-4 font-medium">{row.display}</td>
                <td className="py-2 px-4 text-base text-gray-600">{row.formula}</td>
                <td className="py-2 px-4 text-base text-gray-700">{row.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Metric Descriptions Table */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">Metric Descriptions</h3>
        <table className="min-w-full bg-gray-50 rounded">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left font-semibold">Metric</th>
              <th className="py-2 px-4 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {metricDescriptions.map(row => (
              <tr key={row.label} className="border-t border-gray-200">
                <td className="py-2 px-4 font-medium">{row.label}</td>
                <td className="py-2 px-4 text-base text-gray-700">{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WhatIfMarketingMathPage; 