import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const RevenueGraph = () => {
    const [filter, setFilter] = useState("weekly");

    const data = {
        weekly: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
                {
                    label: "Revenue ($)",
                    data: [1200, 1500, 1100, 1800, 1700, 2000, 2200],
                    borderColor: "#3b82f6",
                    backgroundColor: "rgba(59, 130, 246, 0.2)",
                    fill: true,
                },
            ],
        },
        monthly: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [
                {
                    label: "Revenue ($)",
                    data: [5000, 7000, 6500, 8000],
                    borderColor: "#ef4444",
                    backgroundColor: "rgba(239, 68, 68, 0.2)",
                    fill: true,
                },
            ],
        },
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-md w-full max-w-2xl ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Revenue Overview</h2>
                <select
                    className="border p-2 rounded"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>
            <Line data={data[filter]} />
        </div>
    );
};

export default RevenueGraph;
