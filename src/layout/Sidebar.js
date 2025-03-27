import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar (Sticky) */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-green-800 p-4 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:sticky md:top-16`}
      >
        <nav className="flex flex-col text-xl gap-3 ">
          {/* Close Button (Only Mobile) */}
          <button
            className="md:hidden text-white text-left "
            onClick={() => setIsOpen(false)}
          >
            ✕ Close
          </button>

          {/* Navigation Links */}
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
              key={item.label}
              to={item.link}
              className="px-4 py-2  text-white rounded-lg hover:bg-gray-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
