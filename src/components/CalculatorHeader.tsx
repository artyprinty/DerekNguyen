import { NavLink } from 'react-router-dom';

const calculators = [
  { to: 'ratio-calc', label: 'Ratio Calculator' },
  { to: 'difference', label: 'Difference Calculator' },
  { to: 'percent-change', label: 'Percentage Change' },
  { to: 'percent-of-total', label: 'Percent of Total' },
  { to: 'markup-margin', label: 'Mark-up vs Margin' },
  { to: 'proportion-solver', label: 'Proportion Solver' },
  { to: 'reverse-percent', label: 'Reverse Percent' },
  { to: 'breakdown-percent', label: 'Breakdown % Parts' },
  { to: 'simplify-ratio', label: 'Simplify Ratio/Fraction' },
  { to: 'weighted-average', label: 'Weighted Average' },
  { to: 'rule-of-3', label: 'Rule of 3' },
  { to: 'unit-rate', label: 'Unit Rate' },
  { to: 'working-days', label: 'Working Days' },
];

const CalculatorHeader = () => (
  <nav className="sticky top-0 z-20 bg-white shadow flex flex-wrap gap-2 px-4 py-3 border-b border-gray-200">
    {calculators.map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          `px-4 py-2 rounded font-medium transition-colors duration-150 ${
            isActive
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
          }`
        }
      >
        {label}
      </NavLink>
    ))}
  </nav>
);

export default CalculatorHeader; 