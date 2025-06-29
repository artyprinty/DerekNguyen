import { useState, useEffect } from 'react';

export default function ABTestDashboard() {
  const [groupA, setGroupA] = useState({ size: '', conversions: '' });
  const [groupB, setGroupB] = useState({ size: '', conversions: '' });
  const [output, setOutput] = useState('');

  function runZTest() {
    const nA = parseInt(groupA.size);
    const xA = parseInt(groupA.conversions);
    const nB = parseInt(groupB.size);
    const xB = parseInt(groupB.conversions);

    if ([nA, xA, nB, xB].some((val) => isNaN(val) || val <= 0)) {
      setOutput('Please enter valid positive integers for all fields.');
      return;
    }

    const pA = xA / nA;
    const pB = xB / nB;
    const pPooled = (xA + xB) / (nA + nB);
    const standardError = Math.sqrt(pPooled * (1 - pPooled) * (1 / nA + 1 / nB));
    const z = (pA - pB) / standardError;
    const pValue = 2 * (1 - normalCDF(Math.abs(z)));

    const result = `Group A: ${xA}/${nA} (${(pA * 100).toFixed(2)}%)\nGroup B: ${xB}/${nB} (${(pB * 100).toFixed(2)}%)\n\nZ-score: ${z.toFixed(3)}\nP-value: ${pValue.toFixed(4)}\n\nResult: ${pValue < 0.05 ? 'Statistically significant ✅' : 'Not significant ❌'}`;

    // Educational explanation
    let explanation = '';
    if (pValue < 0.01) {
      explanation = "Very strong evidence that the difference is real (p < 0.01). This result is highly statistically significant.";
    } else if (pValue < 0.05) {
      explanation = "Statistically significant result. There's a less than 5% chance this difference is due to random variation.";
    } else if (pValue < 0.1) {
      explanation = "Some evidence of a difference, but not strong enough to meet standard significance (p < 0.1). Consider gathering more data.";
    } else {
      explanation = "No significant difference detected. The observed variation is likely due to chance. You may need a larger sample or a more impactful test.";
    }
    explanation += `\n\nThe z-score of ${z.toFixed(3)} indicates the difference between groups is ${Math.abs(z) < 1.96 ? 'within' : 'beyond'} the typical 95% confidence range.`;
    if (pA > pB) {
      explanation += `\n\nGroup A performed better with a ${((pA - pB) * 100).toFixed(2)}% higher conversion rate.`;
    } else if (pB > pA) {
      explanation += `\n\nGroup B performed better with a ${((pB - pA) * 100).toFixed(2)}% higher conversion rate.`;
    } else {
      explanation += `\n\nBoth groups had the same conversion rate.`;
    }
    if (nA < 200 || nB < 200) {
      explanation += `\n\nNote: Smaller sample sizes reduce the statistical power of the test. Consider increasing your sample to detect smaller effects.`;
    }
    const fullOutput = result + '\n\nExplanation:\n' + explanation;
    setOutput(fullOutput);
  }

  function normalCDF(z: number) {
    return (1.0 + erf(z / Math.sqrt(2))) / 2.0;
  }

  function erf(x: number) {
    // Approximation of the error function
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  }

  // Run Z-Test automatically when all inputs are filled
  useEffect(() => {
    const nA = parseInt(groupA.size);
    const xA = parseInt(groupA.conversions);
    const nB = parseInt(groupB.size);
    const xB = parseInt(groupB.conversions);
    if ([nA, xA, nB, xB].every((val) => !isNaN(val) && val > 0)) {
      runZTest();
    }
  }, [groupA, groupB]);

  return (
    <div className="max-w-screen-lg mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-2">📊 A/B Test Significance Calculator</h1>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="flex flex-col-reverse md:flex-col gap-6">
          {/* Inputs and Results */}
          <div className="flex-[2] order-1 md:order-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-medium block mb-1">Group A</label>
                <input
                  type="number"
                  placeholder="Sample Size"
                  value={groupA.size}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGroupA({ ...groupA, size: e.target.value })}
                  className="border rounded px-3 py-2 w-full mb-2"
                />
                <input
                  type="number"
                  placeholder="Conversions"
                  value={groupA.conversions}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGroupA({ ...groupA, conversions: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="font-medium block mb-1">Group B</label>
                <input
                  type="number"
                  placeholder="Sample Size"
                  value={groupB.size}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGroupB({ ...groupB, size: e.target.value })}
                  className="border rounded px-3 py-2 w-full mb-2"
                />
                <input
                  type="number"
                  placeholder="Conversions"
                  value={groupB.conversions}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGroupB({ ...groupB, conversions: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
            </div>
            <button
              onClick={runZTest}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              disabled={[groupA.size, groupA.conversions, groupB.size, groupB.conversions].every(v => v && parseInt(v) > 0)}
            >
              Run Z-Test
            </button>
            {/* Results section right below button */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-4">
              <label className="font-medium block mb-2">Results:</label>
              <pre
                className="w-full min-h-[10rem] border rounded px-3 py-2 bg-gray-50 text-gray-800 whitespace-pre-wrap break-words font-mono text-sm"
              >{output}</pre>
            </div>
          </div>
          {/* About this tool */}
          <div className="flex-[2] min-w-[260px] md:max-w-none order-2 md:order-none">
            <div className="bg-gray-50 rounded-lg shadow-inner p-4 h-full flex items-start">
              <div className="prose max-w-none text-sm text-gray-700">
                <p>
                  <strong>About this tool:</strong> This A/B Test Significance Calculator helps you evaluate whether the difference between two conversion rates is statistically meaningful. It uses a two-tailed z-test for comparing proportions, a common method in marketing, product, and UX experimentation.
                </p>
                <p>
                  Simply input the sample size and number of conversions for each group. The tool calculates the conversion rate for each, computes the pooled variance, and outputs the z-score and corresponding p-value.
                </p>
                <p>
                  A p-value below 0.05 indicates that the difference is statistically significant, meaning it's unlikely to have occurred by chance alone. This is a crucial step in validating A/B test results before scaling a campaign or product change.
                </p>
                <p>
                  <strong>Example:</strong> Suppose Group A had 1000 users with 120 conversions (12%), and Group B had 950 users with 100 conversions (10.5%). The tool would calculate a z-score of approximately 0.956 and a p-value around 0.3388, meaning the difference is not statistically significant.
                </p>
                <p>
                  Whether you're testing ad creatives, signup flows, or feature tweaks, this tool provides a fast, interpretable snapshot of your experiment's impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 