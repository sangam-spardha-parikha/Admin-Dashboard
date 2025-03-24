import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../../api/user";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";
import { Link } from "react-router-dom";

const UsersAll = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

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

    // Filter users based on search input
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Logic
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Change items per page
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    // Handle delete user
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(id);
                setUsers(users.filter(user => user._id !== id)); // Update UI
            } catch (error) {
                setError("Error deleting user.");
            }
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-4 bg-gray-100">
                <div className="text-end">
                    <Link to="/add-staff" className="btn btn-primary btn-signin mb-4">Add Staff</Link>
                </div>

                <div className="p-6 bg-white shadow-lg rounded-md">
                    <h2 className="text-xl font-semibold mb-4">All Registered Staff</h2>
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Search Input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            className="border p-2 w-full"
                            placeholder="Search by name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Table */}
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">Name</th>
                                <th className="py-2 px-4 border">Email</th>
                                <th className="py-2 px-4 border">Phone</th>
                                <th className="py-2 px-4 border">Created</th>
                                <th className="py-2 px-4 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map(user => (
                                <tr key={user._id}>
                                    <td className="py-2 px-4 border">{user.name}</td>
                                    <td className="py-2 px-4 border">{user.email}</td>
                                    <td className="py-2 px-4 border">{user.phone}</td>
                                    <td className="py-2 px-4 border">{user.createdAt}</td>
                                    <td className="py-2 px-4 border">
                                        {/* Edit Button */}
                                        <i 
                                            className="bi bi-pencil-fill cursor-pointer text-blue-500"
                                            onClick={() => navigate(`/edit-staff/${user._id}`)}
                                        ></i>

                                        {/* Delete Button */}
                                        <i 
                                            className="bi bi-trash-fill text-red-500 cursor-pointer ml-3"
                                            onClick={() => handleDelete(user._id)}
                                        ></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="mt-4 flex justify-between items-center">
                        {/* Items per Page Selection */}
                        <select
                            className="border p-2"
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                            <option value={40}>40</option>
                            <option value={50}>50</option>
                        </select>

                        {/* Pagination Buttons */}
                        <div>
                            {Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => paginate(index + 1)}
                                    className={`py-1 px-3 mx-1 border ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersAll;
