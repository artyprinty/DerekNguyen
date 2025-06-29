import RevenueForecastsHeader from './RevenueForecastsHeader';
import { Outlet } from 'react-router-dom';

const RevenueForecastsPage = () => (
  <div>
    <RevenueForecastsHeader />
    <div className="p-8">
      <Outlet />
    </div>
  </div>
);

export default RevenueForecastsPage; 