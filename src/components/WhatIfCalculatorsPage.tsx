import WhatIfHeader from './WhatIfHeader';
import { Outlet } from 'react-router-dom';

const WhatIfCalculatorsPage = () => (
  <div>
    <WhatIfHeader />
    <div className="p-8">
      <Outlet />
    </div>
  </div>
);

export default WhatIfCalculatorsPage; 