import { useState } from 'react';
import ReactECharts from 'echarts-for-react';

export default function TwoNumberCalculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [mode, setMode] = useState('');
  const [result, setResult] = useState('');
  const [gridRows, setGridRows] = useState(8);
  const [gridInputs, setGridInputs] = useState<string[]>(Array(8).fill(''));
  const [gridResults, setGridResults] = useState<string[]>(Array(8).fill(''));

  const operations = [
    'Increase by %',
    'Difference',
    '% Change',
    'Reverse %',
    'Mark-up vs Margin'
  ];

  function calculate() {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB)) {
      setResult('Please enter valid numbers.');
      return;
    }

    let output = '';
    switch (mode) {
      case 'Increase by %':
        output = `${numA} increased by ${numB}% is ${(numA * (1 + numB / 100)).toFixed(2)}`;
        break;
      case 'Difference':
        output = `The difference between ${numA} and ${numB} is ${(Math.abs(numA - numB)).toFixed(2)}`;
        break;
      case '% Change':
        output = `Percentage change from ${numA} to ${numB} is ${((numB - numA) / numA * 100).toFixed(2)}%`;
        break;
      case 'Reverse %':
        output = `${numA} is what percent of ${numB}? ${(numA / numB * 100).toFixed(2)}%`;
        break;
      case 'Mark-up vs Margin':
        const margin = ((numA - numB) / numA) * 100;
        const markup = ((numA - numB) / numB) * 100;
        output = `Margin: ${margin.toFixed(2)}%\nMarkup: ${markup.toFixed(2)}%`;
        break;
      default:
        output = 'Please select an operation.';
    }

    setResult(output);
  }

  function handleGridInputChange(idx: number, value: string) {
    const newInputs = [...gridInputs];
    newInputs[idx] = value;
    setGridInputs(newInputs);
    // Calculate result for this row
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const input = parseFloat(value);
    let applied = '';
    if (isNaN(input) || isNaN(numA) || isNaN(numB)) {
      applied = '';
    } else if (mode === 'Increase by %') {
      applied = (input * (1 + numB / 100)).toFixed(2);
    } else if (mode === '% Change') {
      const delta = (numB - numA) / numA;
      applied = (input * (1 + delta)).toFixed(2);
    } else if (mode === 'Reverse %') {
      const percent = numA / numB;
      applied = (input * percent).toFixed(2);
    } else {
      applied = 'n/a';
    }
    const newResults = [...gridResults];
    newResults[idx] = applied;
    setGridResults(newResults);
  }

  function addRows() {
    setGridRows(r => r + 5);
    setGridInputs(inputs => [...inputs, ...Array(5).fill('')]);
    setGridResults(results => [...results, ...Array(5).fill('')]);
  }

  const chartOption = {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['A', 'B']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'bar',
        data: [parseFloat(a) || 0, parseFloat(b) || 0],
        itemStyle: {
          color: '#4f46e5'
        }
      }
    ]
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-2">🧮 Two Number Calculators</h1>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <input type="number" placeholder="Enter A" value={a} onChange={e => { setA(e.target.value); setTimeout(calculate, 0); }} className="border rounded px-3 py-2 w-full" />
        <input type="number" placeholder="Enter B" value={b} onChange={e => { setB(e.target.value); setTimeout(calculate, 0); }} className="border rounded px-3 py-2 w-full" />
        <div className="flex flex-wrap gap-2">
          {operations.map((op) => (
            <button
              key={op}
              className={`px-4 py-2 rounded border ${mode === op ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border-blue-600 hover:bg-blue-50'}`}
              onClick={() => { setMode(op); setTimeout(calculate, 0); }}
            >
              {op}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <label className="font-medium">Result:</label>
        <pre className="w-full mt-2 min-h-[4rem] border rounded px-3 py-2 bg-gray-50 text-gray-800 whitespace-pre-wrap break-words font-mono text-sm">{result}</pre>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <label className="font-medium">Apply to more values:</label>
        <p className="text-sm text-gray-600">Enter values below. We'll apply the selected operation using the same ratio/percent calculated from A and B.</p>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: gridRows }).map((_, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                type="number"
                value={gridInputs[idx]}
                onChange={e => handleGridInputChange(idx, e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
              <span className="text-sm text-gray-700">→ {gridResults[idx]}</span>
            </div>
          ))}
        </div>
        <button
          className="px-4 py-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50"
          onClick={addRows}
        >
          Add 5 rows
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <label className="font-medium mb-2 block">Bar Chart Visualization</label>
        <ReactECharts option={chartOption} style={{ height: 300, width: '100%' }} />
      </div>
    </div>
  );
} 