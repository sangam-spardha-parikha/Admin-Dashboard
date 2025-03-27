import React from "react";
import StatsGrid from "./Cards";
import RevenueGraph from "./Graph";

const Home = () => {
    return (
        <div className="flex flex-col  p-4 bg-gray-100">
            <h1 className="text-xl font-bold">Main Content Area</h1>
            <p>Welcome to the main content area!</p>

            {/* Stats Grid */}
            <StatsGrid />

            {/* Revenue Graph */}
            <div className="mt-5">
                <RevenueGraph />
            </div>
        </div>
    );
};

export default Home;
