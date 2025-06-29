import { NavLink } from 'react-router-dom';

const revenueForecasts = [
  { to: 'revenue-forecast', label: 'Revenue Forecast Dashboard' },
];

const RevenueForecastsHeader = () => (
  <nav className="sticky top-0 z-20 bg-white shadow flex flex-wrap gap-2 px-4 py-3 border-b border-gray-200">
    {revenueForecasts.map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          `px-4 py-2 rounded font-medium transition-colors duration-150 ${
            isActive
              ? 'bg-orange-600 text-white shadow'
              : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
          }`
        }
      >
        {label}
      </NavLink>
    ))}
  </nav>
);

export default RevenueForecastsHeader; 