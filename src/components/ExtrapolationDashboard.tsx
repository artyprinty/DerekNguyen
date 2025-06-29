import { useState } from 'react';
import ReactECharts from 'echarts-for-react';

export default function ExtrapolationDashboard() {
  const [universe, setUniverse] = useState('1000000');
  const [matched, setMatched] = useState('60000');
  const [filtered, setFiltered] = useState('5000');
  const [ir, setIR] = useState('1'); // %

  const numUniverse = parseInt(universe);
  const numMatched = parseInt(matched);
  const numFiltered = parseInt(filtered);
  const numIR = parseFloat(ir);

  const matchRate = (numMatched / numUniverse) * 100;
  const filterRate = (numFiltered / numMatched) * 100;
  const expectedCompletes = (numFiltered * numIR) / 100;
  const overallIR = (expectedCompletes / numUniverse) * 100;

  const chartOption = {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Universe', 'Matched', 'Filtered', 'Completes']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [numUniverse, numMatched, numFiltered, expectedCompletes],
        type: 'bar',
        itemStyle: { color: '#4f46e5' },
        label: { show: true, position: 'top' }
      }
    ]
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-2">📊 Extrapolation Calculator</h1>

      <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Universe Size</label>
          <p className="text-xs text-gray-500 mb-1">e.g. 1,000,000 (records sent)</p>
          <input
            type="number"
            value={universe}
            onChange={e => setUniverse(e.target.value)}
            placeholder="Universe Size"
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Matched Count</label>
          <p className="text-xs text-gray-500 mb-1">e.g. 60,000 (records returned from vendor)</p>
          <input
            type="number"
            value={matched}
            onChange={e => setMatched(e.target.value)}
            placeholder="Matched Count"
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Filtered Criteria</label>
          <p className="text-xs text-gray-500 mb-1">e.g. income &gt; $45K = 5,000</p>
          <input
            type="number"
            value={filtered}
            onChange={e => setFiltered(e.target.value)}
            placeholder="Filtered Count"
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Survey Incidence %</label>
          <p className="text-xs text-gray-500 mb-1">e.g. 1% (those who qualify from filtered group)</p>
          <input
            type="number"
            value={ir}
            onChange={e => setIR(e.target.value)}
            placeholder="Survey Incidence %"
            className="border rounded px-3 py-2 w-full"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-2">
        <p><strong>Match Rate:</strong> {isFinite(matchRate) ? matchRate.toFixed(2) : '--'}%</p>
        <p><strong>Filter Rate:</strong> {isFinite(filterRate) ? filterRate.toFixed(2) : '--'}%</p>
        <p><strong>Expected Completes:</strong> {isFinite(expectedCompletes) ? expectedCompletes.toFixed(0) : '--'}</p>
        <p><strong>Overall Incidence (from Universe):</strong> {isFinite(overallIR) ? overallIR.toFixed(4) : '--'}%</p>
        <p className="text-sm text-gray-600 mt-2">
          Based on {universe} records sent, {matched} matched, and {filtered} met the criteria.
          At {ir}% survey IR, you can expect around {isFinite(expectedCompletes) ? expectedCompletes.toFixed(0) : '--'} completes.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <label className="font-medium mb-2 block">Funnel Visualization</label>
        <ReactECharts option={chartOption} style={{ height: 300, width: '100%' }} />
      </div>
    </div>
  );
} 