import React from "react";
import Sidebar from "../../layout/Sidebar";
import StudentUsers from "../student/ViewStudent";

const Home = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-4 bg-gray-100">
                <h1 className="text-xl font-bold">Main Content Area</h1>
                <p>Welcome to the main content area!</p>

               

            </div>


        </div>
    );
}

export default Home;
