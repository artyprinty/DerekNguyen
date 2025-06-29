import StatisticalAnalysisHeader from './StatisticalAnalysisHeader';
import { Outlet } from 'react-router-dom';

const StatisticalAnalysisPage = () => (
  <div>
    <StatisticalAnalysisHeader />
    <div className="p-8">
      <Outlet />
    </div>
  </div>
);

export default StatisticalAnalysisPage; 