import React, { useEffect } from 'react';
import { ProfileDropdown } from './ProfileDropdown';
import { Link } from 'react-router-dom';

const Sidebar = () => {


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-800 rounded-2xl">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex flex-col flex-1 overflow-y-auto bg-gradient-to-b from-gray-700 to-blue-500 px-2 py-4 gap-10 rounded-2xl">
            <div>
              <a href="#" className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Dashboard
              </a>
            </div>
            <div className="flex flex-col flex-1 gap-3">
              {[
                { label: "Home", icon: "home-icon-path", link: "/home" },
                { label: "Course", icon: "article-icon-path", link: '/course' },
                { label: "Notes", icon: "article-icon-path", link: '/notes' },
                { label: "Test Series", icon: "article-icon-path", link: '/test-series' },
                { label: "Student", icon: "product-icon-path", link: "/student" },
                { label: "Staff", icon: "service-icon-path", link: "/staff" },
                { label: "Payout", icon: "service-icon-path", link: '/payout' }
              ].map((item) => (
                <Link
                  to={item.link}
                  key={item.label}
                  className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"
                >

                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}

    </div>
  );
};

export default Sidebar;
