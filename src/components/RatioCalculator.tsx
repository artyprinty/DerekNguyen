import { useState, useEffect } from 'react'

// Helper function to format numbers without unnecessary decimals
const formatNumber = (num: number): string => {
  return Number.isInteger(num) ? num.toString() : num.toFixed(2);
}

const RatioCalculator = () => {
  const [percentage, setPercentage] = useState<string>('');
  const [rowCount, setRowCount] = useState<number>(4);
  const [selectedOperation, setSelectedOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('divide');

  useEffect(() => {
    const table = document.getElementById("ratioTable") as HTMLTableElement;
    if (!table) return;

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const row = target.closest('tr');
      if (!row) return;

      const rows = Array.from(table.rows);
      const firstRow = rows[0];
      const seedX = parseFloat((firstRow.cells[0].children[0] as HTMLInputElement).value);
      const seedY = parseFloat((firstRow.cells[1].children[0] as HTMLInputElement).value);

      // Calculate and update percentage/result based on operation
      if (!isNaN(seedX) && !isNaN(seedY)) {
        let result = '';
        switch (selectedOperation) {
          case 'add':
            result = `${seedX} + ${seedY} = ${formatNumber(seedX + seedY)}`;
            break;
          case 'subtract':
            result = `${seedX} - ${seedY} = ${formatNumber(seedX - seedY)}`;
            break;
          case 'multiply':
            result = `${seedX} × ${seedY} = ${formatNumber(seedX * seedY)}`;
            break;
          case 'divide':
            if (seedY !== 0) {
              const percent = Math.round((seedX / seedY) * 100);
              result = `${seedX} / ${seedY} = ${percent}%`;
            }
            break;
        }
        setPercentage(result);
      } else {
        setPercentage('');
      }

      // Only proceed with calculations if both values in the first row are present
      if (!isNaN(seedX) && !isNaN(seedY)) {
        // Skip calculation for first row
        if (row === firstRow) return;

        // Find which cell was changed
        const isFirstCell = target === row.cells[0].children[0];
        const currentValue = parseFloat(target.value);
        const otherCell = isFirstCell ? row.cells[1].children[0] as HTMLInputElement : row.cells[0].children[0] as HTMLInputElement;

        if (!isNaN(currentValue)) {
          let calculatedValue: number;
          switch (selectedOperation) {
            case 'add':
              calculatedValue = isFirstCell ? seedY - currentValue : seedX - currentValue;
              break;
            case 'subtract':
              calculatedValue = isFirstCell ? currentValue - seedY : seedX - currentValue;
              break;
            case 'multiply':
              calculatedValue = isFirstCell ? seedY / currentValue : seedX / currentValue;
              break;
            case 'divide':
              calculatedValue = isFirstCell ? currentValue * seedY : seedX / currentValue;
              break;
          }
          otherCell.value = formatNumber(calculatedValue);
        } else {
          otherCell.value = "";
        }
      }
    };

    table.addEventListener("input", handleInput);
    return () => table.removeEventListener("input", handleInput);
  }, [selectedOperation]);

  const handleAddRows = () => {
    setRowCount(prev => prev + 5);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Select operation and enter values to calculate {percentage && `(${percentage})`}
        </h3>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedOperation('add')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              selectedOperation === 'add'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Addition (+)
          </button>
          <button
            onClick={() => setSelectedOperation('subtract')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              selectedOperation === 'subtract'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Subtraction (-)
          </button>
          <button
            onClick={() => setSelectedOperation('multiply')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              selectedOperation === 'multiply'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Multiplication (×)
          </button>
          <button
            onClick={() => setSelectedOperation('divide')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              selectedOperation === 'divide'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Division (÷)
          </button>
        </div>

        <table id="ratioTable" className="w-full border-collapse mb-4">
          <tbody>
            {Array.from({ length: rowCount }).map((_, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={handleAddRows}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add 5 More Rows
        </button>
      </div>
    </div>
  );
}

export default RatioCalculator 