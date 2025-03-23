import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProfileDropdown = () => {
  const { user, handleLogout } = useAuth();
  const [profile, setProfile] = useState(user || {});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setProfile(user);
  }, [user]);

  return (
    <div className="relative">
      {/* Top Bar */}
      <div className="flex items-center space-x-4 p-4 rounded-lg">
        {/* Notifications */}
        <button className="relative text-gray-400 hover:text-gray-200">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0m6 0H9"
            />
          </svg>
        </button>

        {/* User Info */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}
          style={{ background: "#ccc", padding: "4px 18px", borderRadius: "18px" }}>
          <img
            src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden md:block">
            <p className="text-black-800 font-medium">{profile?.name}</p>

          </div>
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
          <ul className="py-1 text-gray-700">
            <li>
              <Link to="/profile/me" className="flex items-center px-4 py-2 hover:bg-gray-100">
                My Profile
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center px-4 py-2 hover:bg-gray-100">
                Account Settings
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 hover:bg-gray-100">
                <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H3" />
                </svg>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
