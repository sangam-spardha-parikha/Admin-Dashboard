import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";
import { fetchNoteById } from "../../api/notesApi";

const BASE_URL = "http://localhost:5000/"; // Change this to your server's URL

const NoteListId = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadNote = async () => {
            try {
                const data = await fetchNoteById(id); // Pass `id`
                setNote(data);
            } catch (err) {
                setError(err.message);
            }
        };
        if (id) {
            loadNote();
        }
    }, [id]); // Dependency array includes `id`

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="w-full sm:w-3/4 p-4 bg-gray-100 max-w-full">
                <h2 className="text-xl font-semibold mb-4">Note Details</h2>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : note ? (
                    <div className="p-4 bg-white shadow rounded-md">
                        <p><strong>Title:</strong> {note.title}</p>
                        <p><strong>Category:</strong> {note.category}</p>
                        <p><strong>Price:</strong> ${note.price}</p>

                        {/* Cover Image */}
                        {note.coverImage && (
                            <div className="mt-4">
                                <p><strong>Cover Image:</strong></p>
                                <img 
                                    src={`${BASE_URL}${note.coverImage.replace("\\", "/")}`} 
                                    alt="Cover" 
                                    className="w-48 h-48 object-cover border rounded-md shadow-md"
                                />
                            </div>
                        )}

                        {/* PDF Note */}
                        {note.pdfNote && (
                            <div className="mt-4">
                                <p><strong>PDF Note:</strong></p>
                                <a 
                                    href={`${BASE_URL}${note.pdfNote.replace("\\", "/")}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    View PDF
                                </a>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default NoteListId;
