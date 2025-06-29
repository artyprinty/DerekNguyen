import LiveMarketingMathHeader from './LiveMarketingMathHeader';
import { Outlet } from 'react-router-dom';

const LiveMarketingMathPage = () => (
  <div>
    <LiveMarketingMathHeader />
    <div className="p-8">
      <Outlet />
    </div>
  </div>
);

export default LiveMarketingMathPage; 