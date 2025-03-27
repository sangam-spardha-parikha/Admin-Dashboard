import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Hamburger Menu Button (Visible on Mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-green-800 rounded-2xl transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex flex-col flex-1 overflow-y-auto bg-green-800 px-2 py-4 gap-10 rounded-2xl">
            <div>
              <button
                className="md:hidden px-4 py-2 text-gray-100 hover:bg-gray-700 w-full text-left"
                onClick={() => setIsOpen(false)}
              >
                ✕ Close
              </button>
            </div>
            <div className="flex flex-col flex-1 gap-3">
              {[
                { label: "Home", link: "/home" },
                { label: "Course", link: "/course" },
                { label: "Notes", link: "/notes" },
                { label: "Test Series", link: "/test-series" },
                { label: "Student", link: "/student" },
                { label: "Staff", link: "/staff" },
                { label: "Admin", link: "/admin" },
                { label: "Payout", link: "/payout" },
              ].map((item) => (
                <Link
                  to={item.link}
                  key={item.label}
                  className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
