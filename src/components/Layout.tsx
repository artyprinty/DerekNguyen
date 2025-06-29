import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Derek's name and LinkedIn link */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-8 py-4 flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Derek Nguyen</h1>
          <a 
            href="https://www.linkedin.com/in/derek-nguyen-9110b355/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            title="Connect with Derek on LinkedIn"
          >
            <svg 
              className="w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fillRule="evenodd" 
                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="ml-1 text-sm font-medium">LinkedIn</span>
          </a>
        </div>
      </header>
      
      {/* Main layout with sidebar and content */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout 