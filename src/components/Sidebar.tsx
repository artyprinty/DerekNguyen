import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
  const [convertersExpanded, setConvertersExpanded] = useState(false);
  const [whatIfExpanded, setWhatIfExpanded] = useState(false);

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Converters</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {/* Currency Converter - Standalone */}
          <li>
            <NavLink to="/currency" className={({ isActive }) => `block px-4 py-2 rounded font-semibold ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>Currency Converter</NavLink>
          </li>
          {/* Converters Section */}
          <li className="border-b border-gray-200 pb-2">
            <button 
              onClick={() => setConvertersExpanded(!convertersExpanded)}
              className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 rounded group"
            >
              <span className="font-semibold text-gray-800 group-hover:text-blue-600">All Calculators</span>
              <span className={`transform transition-transform duration-200 ${convertersExpanded ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                convertersExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <ul className="mt-2 ml-4 space-y-1">
                <li>
                  <NavLink to="/ratio" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Live Calculations
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/increase" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Increase by %
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ratio-calc" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Ratio Calculator
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/difference" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Difference Calculator
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/percent-change" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Percentage Change
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/percent-of-total" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Percent of Total
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/markup-margin" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Mark-up vs Margin
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/proportion-solver" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Proportion Solver
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/reverse-percent" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Reverse Percent
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/breakdown-percent" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Breakdown Total into % Parts
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/simplify-ratio" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Simplify Ratio/Fraction
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/weighted-average" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Weighted Average
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/rule-of-3" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Rule of 3
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/unit-rate" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Unit Rate
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/working-days" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Working Days
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/speed-rate" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Speed/Rate
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>

          {/* What If Section */}
          <li className="border-b border-gray-200 pb-2">
            <button 
              onClick={() => setWhatIfExpanded(!whatIfExpanded)}
              className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 rounded group"
            >
              <span className="font-semibold text-gray-800 group-hover:text-blue-600">What If</span>
              <span className={`transform transition-transform duration-200 ${whatIfExpanded ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                whatIfExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <ul className="mt-2 ml-4 space-y-1">
                <li>
                  <NavLink to="/whatif-cost-cpi" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>Cost vs CPI vs Completes</NavLink>
                </li>
                <li>
                  <NavLink to="/whatif-timeline" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>Timeline vs Daily IR vs Completes</NavLink>
                </li>
                <li>
                  <NavLink to="/whatif-quote-breakdown" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>Quote Impact Breakdown</NavLink>
                </li>
                <li>
                  <NavLink to="/whatif-soft-launch" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>Soft Launch Planning</NavLink>
                </li>
                <li>
                  <NavLink to="/whatif-quota" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>Quota What-Ifs</NavLink>
                </li>
              </ul>
            </div>
          </li>
          {/* Live Marketing Math Group OUTSIDE What If */}
          <li className="border-b border-gray-200 pb-2 mt-4">
            <div className="text-xs font-bold text-gray-500 uppercase mb-2 pl-2">Live Marketing Math</div>
            <ul className="ml-4 space-y-1">
              <li>
                <NavLink to="/whatif-marketing-math" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}>Marketing Metrics Dashboard</NavLink>
              </li>
            </ul>
          </li>
          {/* Revenue Forecasts Section */}
          <li className="border-b border-gray-200 pb-2 mt-4">
            <div className="text-xs font-bold text-gray-500 uppercase mb-2 pl-2">Revenue Forecasts</div>
            <ul className="ml-4 space-y-1">
              <li>
                <NavLink to="/revenue-forecast" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 hover:bg-gray-100'}`}>Revenue Forecast Dashboard</NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 