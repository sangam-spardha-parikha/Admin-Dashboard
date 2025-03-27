import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";

const dummyNotifications = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 890",
        message: "Your subscription is expiring soon.",
        createdAt: "2024-03-25",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1 987 654 321",
        message: "New feature update available!",
        createdAt: "2024-03-24",
    },
    {
        id: 3,
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "+1 555 123 456",
        message: "Payment received successfully.",
        createdAt: "2024-03-23",
    },
];

const NotificationPage = () => {
    const [selectedNotification, setSelectedNotification] = useState(null);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="w-full sm:w-3/4 p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-6">Notifications</h1>

                {/* Notification Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dummyNotifications.map((notification) => (
                        <div key={notification.id} className="bg-white p-4 shadow rounded-md">
                            <h2 className="text-lg font-semibold">{notification.name}</h2>
                            <p className="text-gray-600">{notification.email}</p>
                            <p className="text-gray-600">{notification.phone}</p>
                            <button
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => setSelectedNotification(notification)}
                            >
                                View Full
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for Full Notification Details */}
            {selectedNotification && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-2">{selectedNotification.name}</h2>
                        <p className="text-gray-700"><strong>Email:</strong> {selectedNotification.email}</p>
                        <p className="text-gray-700"><strong>Phone:</strong> {selectedNotification.phone}</p>
                        <p className="text-gray-700"><strong>Message:</strong> {selectedNotification.message}</p>
                        <p className="text-gray-700"><strong>Created At:</strong> {selectedNotification.createdAt}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => setSelectedNotification(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationPage;
