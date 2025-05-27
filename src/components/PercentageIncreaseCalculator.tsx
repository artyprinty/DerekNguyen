import { useState, useEffect } from 'react'

// Helper function to format numbers without unnecessary decimals
const formatNumber = (num: number): string => {
  return Number.isInteger(num) ? num.toString() : num.toFixed(2);
}

const PercentageIncreaseCalculator = () => {
  const [percentage, setPercentage] = useState<string>('');
  const [rowCount, setRowCount] = useState<number>(4);

  useEffect(() => {
    const table = document.getElementById("increaseTable") as HTMLTableElement;
    if (!table) return;

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const row = target.closest('tr');
      if (!row) return;

      const rows = Array.from(table.rows);
      const firstRow = rows[0];
      const baseX = parseFloat((firstRow.cells[0].children[0] as HTMLInputElement).value);
      const baseY = parseFloat((firstRow.cells[1].children[0] as HTMLInputElement).value);

      // Calculate and update percentage
      if (!isNaN(baseX) && !isNaN(baseY) && baseX !== 0) {
        const increaseAmount = baseY - baseX;
        const percentageIncrease = Math.round((increaseAmount / baseX) * 100);
        setPercentage(`${baseX} → ${baseY} = ${percentageIncrease}% increase`);
      } else {
        setPercentage('');
      }

      // Only proceed with calculations if both values in the first row are present
      if (!isNaN(baseX) && !isNaN(baseY) && baseX !== 0) {
        const increaseAmount = baseY - baseX;
        const percentageIncrease = increaseAmount / baseX;

        // Skip calculation for first row
        if (row === firstRow) return;

        // Find which cell was changed
        const isFirstCell = target === row.cells[0].children[0];
        const currentValue = parseFloat(target.value);
        const otherCell = isFirstCell ? row.cells[1].children[0] as HTMLInputElement : row.cells[0].children[0] as HTMLInputElement;

        if (!isNaN(currentValue)) {
          // Calculate the corresponding value based on which cell was changed
          const calculatedValue = isFirstCell 
            ? currentValue + (currentValue * percentageIncrease)
            : (currentValue - (currentValue * percentageIncrease)) / (1 + percentageIncrease);
          otherCell.value = formatNumber(calculatedValue);
        } else {
          otherCell.value = "";
        }
      }
    };

    table.addEventListener("input", handleInput);
    return () => table.removeEventListener("input", handleInput);
  }, []);

  const handleAddRows = () => {
    setRowCount(prev => prev + 5);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Enter first row to set % increase {percentage && `(${percentage})`}
        </h3>

        <table id="increaseTable" className="w-full border-collapse mb-4">
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

export default PercentageIncreaseCalculator 