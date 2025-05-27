import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout 