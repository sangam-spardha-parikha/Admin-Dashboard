import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../api/user";
import Sidebar from "../../layout/Sidebar";

const UsersAll = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            }
        };
        loadUsers();
    }, []);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-4 bg-gray-100">
            <div className="p-6 bg-white shadow-lg rounded-md">
                <h2 className="text-xl font-semibold mb-4">All Registered Student</h2>
                {error && <p className="text-red-500">{error}</p>}
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">Email</th>
                            <th className="py-2 px-4 border">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className="py-2 px-4 border">{user.name}</td>
                                <td className="py-2 px-4 border">{user.email}</td>
                                <td className="py-2 px-4 border">{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
            
        </div>
    );
};

export default UsersAll;
