import React, { useEffect, useState } from "react";
import { fetchStudents } from "../../api/user";
import Sidebar from "../../layout/Sidebar";

const StudentUsers = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const loadStudents = async () => {
            try {
                const data = await fetchStudents();
                setStudents(data);
            } catch (err) {
                setError(err.message);
            }
        };
        loadStudents();
    }, []);

    // Filter students by name based on the search query
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get the current page students
    const indexOfLastStudent = currentPage * itemsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    // Change page handler
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Change items per page handler
    const handleItemsPerPageChange = (e) => setItemsPerPage(Number(e.target.value));

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-4 bg-gray-100">
                <div className="p-6 bg-white shadow-lg rounded-md">
                    <h2 className="text-xl font-semibold mb-4">All Students</h2>
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Search input */}
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
                                <th className="py-2 px-4 border">Education</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentStudents.map((student) => (
                                <tr key={student._id}>
                                    <td className="py-2 px-4 border">{student.name}</td>
                                    <td className="py-2 px-4 border">{student.email}</td>
                                    <td className="py-2 px-4 border">{student.phone}</td>
                                    <td className="py-2 px-4 border">{student.education}</td>
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
                            {Array.from({ length: Math.ceil(filteredStudents.length / itemsPerPage) }, (_, index) => (
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

export default StudentUsers;
