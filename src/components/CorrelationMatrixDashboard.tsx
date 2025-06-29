import { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

export default function CorrelationMatrixDashboard() {
  const [rawData, setRawData] = useState('');
  const [output, setOutput] = useState('');
  const [headers, setHeaders] = useState<string[]>([]);
  const [matrix, setMatrix] = useState<string[][]>([]);
  const [heatmapData, setHeatmapData] = useState<any[]>([]);
  const [headerLabels, setHeaderLabels] = useState<string[]>([]);

  const sampleData = `1000,50,5,100\n2000,90,8,200\n1500,75,6,150`;
  const sampleHeader = 'Impressions,Clicks,Conversions,Spend';

  function computeCorrelationMatrix() {
    const rows = rawData.trim().split('\n');
    if (rows.length < 2) {
      setOutput('Please enter at least two rows of data.');
      setHeaders([]);
      setMatrix([]);
      setHeatmapData([]);
      setHeaderLabels([]);
      return;
    }

    const headers = rows[0].includes(',') && rows[0].match(/[a-zA-Z]/) ? rows[0].split(',').map((h) => h.trim()) : sampleHeader.split(',');
    const data = rows[0].includes(',') && rows[0].match(/[a-zA-Z]/)
      ? rows.slice(1).map((row) => row.split(',').map(Number))
      : rows.map((row) => row.split(',').map(Number));

    if (data.some((row) => row.length !== headers.length || row.some(isNaN))) {
      setOutput('Ensure all rows have numeric values and match the header length.');
      setHeaders([]);
      setMatrix([]);
      setHeatmapData([]);
      setHeaderLabels([]);
      return;
    }

    const n = data.length;
    const means = headers.map((_, j) => data.reduce((sum, row) => sum + row[j], 0) / n);
    const stds = headers.map((_, j) => Math.sqrt(data.reduce((sum, row) => sum + (row[j] - means[j]) ** 2, 0) / n));

    const matrix = headers.map((_, i) =>
      headers.map((_, j) => {
        const cov = data.reduce((sum, row) => sum + (row[i] - means[i]) * (row[j] - means[j]), 0) / n;
        return (cov / (stds[i] * stds[j])).toFixed(3);
      })
    );

    let matrixText = 'Correlation Matrix (Pearson):\n';
    matrixText += '\t' + headers.join('\t') + '\n';
    matrix.forEach((row, i) => {
      matrixText += headers[i] + '\t' + row.join('\t') + '\n';
    });

    setOutput(matrixText);
    setHeaders(headers);
    setMatrix(matrix);
    setHeatmapData(
      matrix.flatMap((row, i) =>
        row.map((value, j) => [j, i, parseFloat(value)])
      )
    );
    setHeaderLabels(headers);
  }

  function useSampleData() {
    setRawData(sampleData);
    // The useEffect below will handle triggering computeCorrelationMatrix
  }

  function resetAll() {
    setRawData('');
    setOutput('');
    setHeaders([]);
    setMatrix([]);
    setHeatmapData([]);
    setHeaderLabels([]);
  }

  // Automatically compute stats when rawData changes (e.g., from pasting or using sample data)
  useEffect(() => {
    if (rawData.trim().length > 0) {
      computeCorrelationMatrix();
    } else {
      setOutput('');
      setHeaders([]);
      setMatrix([]);
      setHeatmapData([]);
      setHeaderLabels([]);
    }
  }, [rawData]);

  return (
    <div className="max-w-screen-lg mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-2">📈 Correlation Matrix Analyzer</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <label className="font-medium block mb-2">Paste CSV-formatted numeric data:</label>
        <textarea
          className="w-full h-40 border rounded px-3 py-2 mb-2 font-mono text-sm"
          placeholder={sampleData}
          value={rawData}
          onChange={e => setRawData(e.target.value)}
        />
        <div className="flex flex-wrap gap-2 mb-2">
          <button
            onClick={computeCorrelationMatrix}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Compute Correlation Matrix
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
        <pre className="w-full min-h-[15rem] border rounded px-3 py-2 bg-gray-50 text-gray-800 whitespace-pre-wrap break-words font-mono text-sm">{output}</pre>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="prose max-w-none text-sm text-gray-700">
          <p>
            <strong>About this tool:</strong> The Correlation Matrix Analyzer helps you discover relationships between numeric variables in your dataset. By computing the Pearson correlation coefficient between each pair of variables, you can quickly identify which features move together — positively, negatively, or not at all.
          </p>
          <p>
            Paste CSV-formatted data into the input field above. Each row should represent one observation, and each column should be a numeric variable.
          </p>
          <p>
            <strong>Example:</strong> If you input:
          </p>
          <pre className="bg-gray-100 p-2 rounded text-xs font-mono">
            <span style={{ color: '#2563eb' }}>Impressions  Clicks  Conversions  Spend</span>{'\n'}
            <span style={{ color: '#92400e' }}>1000         50      5           100{"\n"}2000         90      8           200{"\n"}1500         75      6           150</span>
          </pre>
          <p>
            The tool will output a correlation matrix showing how closely each pair of variables is related. For instance, you might find that Clicks and Spend have a perfect positive correlation (r = 1.000), suggesting that as one increases, so does the other.
          </p>
          <p>
            This type of analysis is widely used in marketing, finance, and product analytics to understand variable relationships, identify redundant features, or feed feature selection steps in machine learning workflows.
          </p>
        </div>
      </div>

      {heatmapData.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <label className="font-medium mb-2 block">Visual Correlation Heatmap</label>
          <ReactECharts
            option={{
              tooltip: { position: 'top' },
              grid: { top: 80, left: 100 },
              xAxis: { type: 'category', data: headerLabels },
              yAxis: { type: 'category', data: headerLabels },
              visualMap: {
                min: -1,
                max: 1,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '10'
              },
              series: [
                {
                  name: 'Correlation',
                  type: 'heatmap',
                  data: heatmapData,
                  label: {
                    show: true,
                    formatter: ({ value }: any) => value[2].toFixed(2)
                  },
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            }}
            style={{ height: 400, width: '100%' }}
          />
        </div>
      )}
    </div>
  );
} 