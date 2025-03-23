import React, { useEffect } from 'react';
import { ProfileDropdown } from './ProfileDropdown';

const Header = () => {


  // Define the predefined fallback logo URL
  const fallbackLogo = "https://arrivalsolutions.in/img/logo.jpg";

  return (
    <div className="flex bg-gray-100 h-16 shadow-sm">
      {/* Logo or Navigation Placeholder */}
      <div className="flex items-center px-6 bg-white border-r border-gray-200">
        
            <img
              src={ fallbackLogo}
              alt="Company Logo"
              className="h-12 w-12 object-contain"
            />
         
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-between px-4 bg-white">
        {/* Placeholder for Future Navigation Items */}
        <div className="flex items-center">
          {/* Empty to align layout */}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default Header;
