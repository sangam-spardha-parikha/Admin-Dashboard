import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";
import { Link } from "react-router-dom";
import { fetchTestSeries, deleteTestSeries } from "../../api/testSeriesApi";

const TestList = () => {
    const [test, setTest] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadTestSeries = async () => {
            try {
                const data = await fetchTestSeries();
                setTest(data);
            } catch (err) {
                setError(err.message);
            }
        };
        loadTestSeries();
    }, []);

    // Filter test series based on search input
    const filteredTests = test.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Logic
    const indexOfLastTest = currentPage * itemsPerPage;
    const indexOfFirstTest = indexOfLastTest - itemsPerPage;
    const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Change items per page
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    // Handle delete test series
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this test series?")) {
            try {
                await deleteTestSeries(id);
                setTest(test.filter(item => item._id !== id)); // Update UI
            } catch (error) {
                setError("Error deleting test series.");
            }
        }
    };

    return (
        <div className="flex min-h-[100vh] flex-col p-4 bg-gray-100">


            {/* Main Content */}
            <div className="">
                <div className="text-end">
                    <Link to="/add-test-series" className="btn btn-primary btn-signin mb-4">
                        Add Test Series
                    </Link>
                </div>

                <div className="p-6 bg-white shadow-lg rounded-md">
                    <h2 className="text-xl font-semibold mb-4">All Test Series</h2>
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Search Input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            className="border p-2 w-full"
                            placeholder="Search by title"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Table */}
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">Title</th>
                                <th className="py-2 px-4 border">Category</th>
                                <th className="py-2 px-4 border">Price</th>
                                <th className="py-2 px-4 border">Created</th>
                                <th className="py-2 px-4 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTests.map(item => (
                                <tr key={item._id}>
                                    <td className="py-2 px-4 border">{item.title}</td>
                                    <td className="py-2 px-4 border">{item.category}</td>
                                    <td className="py-2 px-4 border">₹{item.price}</td>
                                    <td className="py-2 px-4 border">{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border">

                                        {/* View Data Button */}
                                        <i
                                            className="bi bi-eye-fill cursor-pointer text-blue-500"
                                            onClick={() => navigate(`/view-test-series/${item._id}`)}
                                        ></i>

                                        {/* Edit Button */}
                                        <i
                                            className="bi bi-pencil-fill cursor-pointer text-blue-500 mx-3"
                                            onClick={() => navigate(`/edit-test-series/${item._id}`)}
                                        ></i>

                                        {/* Delete Button */}
                                        <i
                                            className="bi bi-trash-fill text-red-500 cursor-pointer "
                                            onClick={() => handleDelete(item._id)}
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
                            {Array.from({ length: Math.ceil(filteredTests.length / itemsPerPage) }, (_, index) => (
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

export default TestList;
