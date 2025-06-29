import { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

export default function GroupComparisonBoxplotDashboard() {
  const [rawData, setRawData] = useState('');
  const [output, setOutput] = useState('');
  const [boxData, setBoxData] = useState<any[]>([]);
  const [groupLabels, setGroupLabels] = useState<string[]>([]);

  const sampleData = `Email,120\nEmail,130\nEmail,125\nSearch,90\nSearch,95\nSearch,105`;
  const sampleHeader = 'Channel,Spend';

  function computeBoxplotStats() {
    const rows = rawData.trim().split('\n');
    if (rows.length < 2) {
      setOutput('Please enter at least two rows of data.');
      setBoxData([]);
      setGroupLabels([]);
      return;
    }

    const [groupHeader, valueHeader] = rows[0].includes(',') && rows[0].match(/[a-zA-Z]/)
      ? rows[0].split(',').map(h => h.trim())
      : sampleHeader.split(',');
    const data: [string, number][] = (rows[0].includes(',') && rows[0].match(/[a-zA-Z]/)
      ? rows.slice(1)
          .filter(row => row.split(',').length === 2)
          .map(row => {
            const [group, value] = row.split(',');
            return [group.trim(), parseFloat(value.trim())] as [string, number];
          })
      : rows
          .filter(row => row.split(',').length === 2)
          .map(row => {
            const [group, value] = row.split(',');
            return [group.trim(), parseFloat(value.trim())] as [string, number];
          })
    ).filter(([group, value]) => typeof group === 'string' && group.length > 0 && typeof value === 'number' && !isNaN(value));

    const grouped: Record<string, number[]> = {};
    for (const [group, value] of data) {
      if (!grouped[group]) grouped[group] = [];
      if (!isNaN(value)) grouped[group].push(value);
    }

    const statsOutput = [];
    const chartData = [];
    const labels = [];

    for (const group in grouped) {
      const values: number[] = grouped[group].filter((v): v is number => typeof v === 'number' && !isNaN(v)).sort((a, b) => a - b);
      if (values.length === 0) continue;
      const q1 = percentile(values, 25);
      const q2 = percentile(values, 50);
      const q3 = percentile(values, 75);
      const min = values[0];
      const max = values[values.length - 1];
      statsOutput.push(`Group: ${group}\n  Min: ${min}\n  Q1: ${q1}\n  Median: ${q2}\n  Q3: ${q3}\n  Max: ${max}`);
      chartData.push([min, q1, q2, q3, max]);
      labels.push(group);
    }

    setOutput(statsOutput.join('\n\n'));
    setBoxData(chartData);
    setGroupLabels(labels);
  }

  function percentile(arr: number[], p: number) {
    const index = (p / 100) * (arr.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index - lower;
    if (upper >= arr.length) return arr[lower];
    return arr[lower] * (1 - weight) + arr[upper] * weight;
  }

  function useSampleData() {
    setRawData(sampleData);
    // The useEffect below will handle triggering computeBoxplotStats
  }

  function resetAll() {
    setRawData('');
    setOutput('');
    setBoxData([]);
    setGroupLabels([]);
  }

  // Automatically compute stats when rawData changes (e.g., from pasting or using sample data)
  useEffect(() => {
    if (rawData.trim().length > 0) {
      computeBoxplotStats();
    } else {
      // Clear results if input is empty
      setOutput('');
      setBoxData([]);
      setGroupLabels([]);
    }
  }, [rawData]); // Dependency array: run this effect when rawData changes

  const chartOption = {
    tooltip: { trigger: 'item' },
    grid: { top: 80, bottom: 30 },
    xAxis: {
      type: 'category',
      data: groupLabels,
      boundaryGap: true,
      name: 'Group',
      splitArea: { show: false },
      axisLabel: { rotate: 30 }
    },
    yAxis: {
      type: 'value',
      name: 'Value'
    },
    series: [
      {
        name: 'Boxplot',
        type: 'boxplot',
        data: boxData
      }
    ]
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-2">📦 Group Comparison with Boxplots</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <label className="font-medium block mb-2">Paste CSV data (Group,Value):</label>
        <textarea
          className="w-full h-40 border rounded px-3 py-2 mb-2 font-mono text-sm"
          placeholder={sampleData}
          value={rawData}
          onChange={e => setRawData(e.target.value)}
        />
        <div className="flex flex-wrap gap-2 mb-2">
          <button
            onClick={computeBoxplotStats}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Compute Boxplot Stats
          </button>
          <button
            onClick={useSampleData}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Use sample data
          </button>
          <button
            onClick={resetAll}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            Reset
          </button>
        </div>
        <pre className="bg-gray-50 p-2 rounded text-xs font-mono text-gray-700 border"><span style={{ color: '#2563eb' }}>{sampleHeader}</span>{'\n'}{sampleData.replace(/,/g, ',').replace(/\n/g, '\n')}</pre>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <label className="font-medium block mb-2">Results:</label>
        <pre className="w-full min-h-[10rem] border rounded px-3 py-2 bg-gray-50 text-gray-800 whitespace-pre-wrap break-words font-mono text-sm">{output}</pre>
      </div>

      {boxData.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <label className="font-medium mb-2 block">Boxplot Visualization</label>
          <ReactECharts option={chartOption} style={{ height: 400, width: '100%' }} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="prose max-w-none text-sm text-gray-700">
          <p>
            <strong>About this tool:</strong> This tool helps you understand how different groups (e.g., marketing channels or cohorts) compare in terms of numeric values such as spend, conversion, or engagement.
          </p>
          <p>
            Paste your data in CSV format with two columns: a group label and a numeric value. Each row should represent one observation.
          </p>
          <p>
            <strong>Example:</strong>
          </p>
          <pre className="bg-gray-100 p-2 rounded text-xs whitespace-pre font-mono">
Channel,Spend
Email,120
Email,130
Email,125
Search,90
Search,95
Search,105
</pre>
          <p>
            The tool calculates the five-number summary for each group — minimum, first quartile (Q1), median (Q2), third quartile (Q3), and maximum — which is the basis for boxplot visualization.
          </p>
        </div>
      </div>
    </div>
  );
} 