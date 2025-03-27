import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";
import { Link } from "react-router-dom";
import { fetchNotes, deleteNote } from "../../api/notesApi";

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadNotes = async () => {
            try {
                const data = await fetchNotes();
                setNotes(data);
            } catch (err) {
                setError(err.message);
            }
        };
        loadNotes();
    }, []);

    // Filter notes based on search input
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Logic
    const indexOfLastNote = currentPage * itemsPerPage;
    const indexOfFirstNote = indexOfLastNote - itemsPerPage;
    const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Change items per page
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    // Handle delete note
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                await deleteNote(id);
                setNotes(notes.filter(note => note._id !== id)); // Update UI
            } catch (error) {
                setError("Error deleting note.");
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
            <div className="w-full sm:w-3/4 p-4 bg-gray-100 max-w-full">
                <div className="text-end">
                    <Link to="/add-note" className="btn btn-primary btn-signin mb-4">Add Note</Link>
                </div>

                <div className="p-6 bg-white shadow-lg rounded-md">
                    <h2 className="text-xl font-semibold mb-4">All Notes</h2>
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
                            {currentNotes.map(note => (
                                <tr key={note._id}>
                                    <td className="py-2 px-4 border">{note.title}</td>
                                    <td className="py-2 px-4 border">{note.category}</td>
                                    <td className="py-2 px-4 border">₹{note.price}</td>
                                    <td className="py-2 px-4 border">{new Date(note.createdAt).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border">
                                        {/* View Data Button */}
                                        <i
                                            className="bi bi-eye-fill cursor-pointer text-blue-500"
                                            onClick={() => navigate(`/view-note/${note._id}`)}
                                        ></i>

                                        {/* Edit Button */}
                                        <i
                                            className="bi bi-pencil-fill cursor-pointer text-blue-500 mx-3"
                                            onClick={() => navigate(`/edit-note/${note._id}`)}
                                        ></i>

                                        {/* Delete Button */}
                                        <i
                                            className="bi bi-trash-fill text-red-500 cursor-pointer "
                                            onClick={() => handleDelete(note._id)}
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
                            {Array.from({ length: Math.ceil(filteredNotes.length / itemsPerPage) }, (_, index) => (
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

export default NoteList;
