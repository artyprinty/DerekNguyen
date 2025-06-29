import { NavLink } from 'react-router-dom';

const whatIfCalculators = [
  { to: 'whatif-cost-cpi', label: 'Cost vs CPI vs Completes' },
  { to: 'whatif-timeline', label: 'Timeline vs Daily IR vs Completes' },
  { to: 'whatif-quote-breakdown', label: 'Quote Impact Breakdown' },
  { to: 'whatif-soft-launch', label: 'Soft Launch Planning' },
  { to: 'whatif-quota', label: 'Quota What-Ifs' },
  { to: 'whatif-marketing-math', label: 'Marketing Metrics Dashboard' },
];

const WhatIfHeader = () => (
  <nav className="sticky top-0 z-20 bg-white shadow flex flex-wrap gap-2 px-4 py-3 border-b border-gray-200">
    {whatIfCalculators.map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          `px-4 py-2 rounded font-medium transition-colors duration-150 ${
            isActive
              ? 'bg-green-600 text-white shadow'
              : 'bg-gray-100 text-gray-700 hover:bg-green-100'
          }`
        }
      >
        {label}
      </NavLink>
    ))}
  </nav>
);

export default WhatIfHeader; 