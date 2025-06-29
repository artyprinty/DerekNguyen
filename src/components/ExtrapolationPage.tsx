import ExtrapolationHeader from './ExtrapolationHeader';
import { Outlet } from 'react-router-dom';

const ExtrapolationPage = () => (
  <div>
    <ExtrapolationHeader />
    <div className="p-8">
      <Outlet />
    </div>
  </div>
);

export default ExtrapolationPage; 