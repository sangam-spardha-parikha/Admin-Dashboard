import React from "react";

export const ButtonTable = ({ label, onClick, color = "bg-blue-500", icon }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center px-4 py-2 text-white rounded ${color} hover:bg-opacity-80 transition duration-200`}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {label}
        </button>
    );
}