import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Mobile Menu Button (Now Below Header) */}
      <div className="fixed top-16 left-0 w-full md:hidden flex justify-start p-2 bg-gray-800 mb-12">
        <button
          className="p-2 text-white bg-green-700 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰ Menu
        </button>
      </div>

      {/* Sidebar (Sticky on Desktop, Toggles on Mobile) */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-green-800 p-4 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:sticky md:top-16`}
      >
        {/* Close Button (Only on Mobile) */}
        <button
          className="md:hidden text-white text-left mb-4"
          onClick={() => setIsOpen(false)}
        >
          ✕ Close
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-col text-xl gap-3">
          {[
            { label: "Home", link: "/home" },
            { label: "Course", link: "/course" },
            { label: "Notes", link: "/notes" },
            { label: "Test Series", link: "/test-series" },
            { label: "Student", link: "/student" },
            { label: "Staff", link: "/staff" },
            { label: "Admin", link: "/admin" },
            { label: "Payments", link: "/payments" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.link}
              className="px-4 py-2 text-white rounded-lg hover:bg-gray-600 transition"
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
