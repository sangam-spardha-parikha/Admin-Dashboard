import React from "react";
import logo from "./../assets/logo.jpg";
import { ProfileDropdown } from "./ProfileDropdown";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md h-16 flex items-center px-6 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Company Logo" className="h-12 w-12 object-contain" />
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Profile Dropdown */}
      <ProfileDropdown />
    </header>
  );
};

export default Header;
