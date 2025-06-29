import { NavLink } from 'react-router-dom';

const extrapolationCalculators = [
  { to: 'extrapolation-calculator', label: 'Extrapolation Calculator' },
];

const ExtrapolationHeader = () => (
  <nav className="sticky top-0 z-20 bg-white shadow flex flex-wrap gap-2 px-4 py-3 border-b border-gray-200">
    {extrapolationCalculators.map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          `px-4 py-2 rounded font-medium transition-colors duration-150 ${
            isActive
              ? 'bg-cyan-600 text-white shadow'
              : 'bg-gray-100 text-gray-700 hover:bg-cyan-100'
          }`
        }
      >
        {label}
      </NavLink>
    ))}
  </nav>
);

export default ExtrapolationHeader; 