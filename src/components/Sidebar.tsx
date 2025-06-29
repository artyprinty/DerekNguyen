import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
  const [convertersExpanded, setConvertersExpanded] = useState(false);
  const [whatIfExpanded, setWhatIfExpanded] = useState(false);

  return (
    <div className="w-64 bg-white shadow-md">
      {/* 
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Converters</h1>
      </div>
      */}
      <nav className="p-4">
        <ul className="space-y-2">
          {/* Comment out the Articles Section */}
          {/* 
          <li className="border-b border-gray-200 pb-2">
            <NavLink to="/articles" className={({ isActive }) => `block px-4 py-2 rounded font-semibold ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
              Articles
            </NavLink>
          </li>
          */}

          {/* Currency Converter - Standalone */}
          <li>
            <NavLink to="/currency" className={({ isActive }) => `block px-4 py-2 rounded font-semibold ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>Currency Converter</NavLink>
          </li>
          {/* Converters Section */}
          <li className="border-b border-gray-200 pb-2">
            <NavLink to="/all-calculators" className={({ isActive }) => `block px-4 py-2 rounded font-semibold ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
              All Calculators
            </NavLink>
          </li>

          {/* What If - now a direct link */}
          <li className="border-b border-gray-200 pb-2">
            <NavLink to="/what-if" className={({ isActive }) => `block px-4 py-2 rounded font-semibold ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
              What If
            </NavLink>
          </li>
          {/* Live Marketing Math - now a direct link */}
          <li className="border-b border-gray-200 pb-2 mt-4">
            <NavLink to="/live-marketing-math" className={({ isActive }) => `block px-4 py-2 rounded font-semibold ${isActive ? 'bg-yellow-100 text-yellow-700' : 'text-gray-700 hover:bg-yellow-50'}`}>
              Live Marketing Math
            </NavLink>
          </li>
          {/* Revenue Forecasts - now a direct link */}
          <li className="border-b border-gray-200 pb-2 mt-4">
            <NavLink to="/revenue-forecasts" className={({ isActive }) => `block px-4 py-2 rounded font-semibold ${isActive ? 'bg-orange-100 text-orange-700' : 'text-gray-700 hover:bg-orange-50'}`}>
              Revenue Forecasts
            </NavLink>
          </li>
          {/* Statistical Analysis - now a direct link */}
          <li className="border-b border-gray-200 pb-2 mt-4">
            <NavLink to="/statistical-analysis" className={({ isActive }) => `block px-4 py-2 rounded font-semibold ${isActive ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-purple-50'}`}>
              Statistical Analysis
            </NavLink>
          </li>
          {/* Extrapolation Calculator - now a direct link */}
          <li className="border-t border-gray-300 pt-4 mt-8">
            <NavLink to="/extrapolation" className={({ isActive }) => `block px-4 py-2 rounded font-semibold ${isActive ? 'bg-cyan-100 text-cyan-700' : 'text-gray-700 hover:bg-cyan-50'}`}>
              Extrapolation Calculator
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 