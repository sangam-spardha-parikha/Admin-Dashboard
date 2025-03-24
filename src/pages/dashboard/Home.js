import React from "react";
import Sidebar from "../../layout/Sidebar";

import StatsGrid from "./Cards";
import RevenueGraph from "./Graph";

const Home = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-full sm:w-1/4 bg-gray-800 text-white">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="w-full sm:w-3/4 p-4 bg-gray-100 max-w-full">
                <h1 className="text-xl font-bold">Main Content Area</h1>
                <p>Welcome to the main content area!</p>

                <StatsGrid />

                <div className="mt-5">
                    <RevenueGraph />
                </div>
            </div>


        </div>
    );
}

export default Home;
