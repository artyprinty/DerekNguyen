import CalculatorHeader from './CalculatorHeader';
import { Outlet } from 'react-router-dom';

const AllCalculatorsPage = () => (
  <div>
    <CalculatorHeader />
    <div className="p-8">
      <Outlet />
    </div>
  </div>
);

export default AllCalculatorsPage; 