import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table"; // Adjusted import path
import { fetchNotes, deleteNote } from "../../api/notesApi";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { ButtonTable } from "../../components/Button";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
      } catch (err) {
        console.error("Error fetching notes:", err.message);
        setError("Failed to load notes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadNotes();
  }, []);

  // Delete Note
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (confirmDelete) {
      try {
        await deleteNote(id);
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      } catch (error) {
        console.error("Error deleting note:", error);
        alert("Failed to delete the note. Please try again.");
      }
    }
  };

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Category", accessor: "category" },
    { header: "Price", accessor: "price" },
  ];

  const actions = [
    {
      label: "View",
      icon: <FaEye />,
      color: "#28a745",
      onClick: (note) => navigate(`/view-note/${note._id}`),
    },
    {
      label: "Edit",
      icon: <FaEdit />,
      color: "#ffc107",
      onClick: (note) => navigate(`/edit-note/${note._id}`),
    },
    {
      label: "Delete",
      icon: <FaTrash />,
      color: "#dc3545",
      onClick: (note) => handleDelete(note._id),
    },
  ];

  const btnLabel = [
    {
      label: "Add Note",
      onClick: () => navigate("/add-note"),

    },
  ];

  return (
    <div className="flex min-h-[100vh] flex-col p-4 bg-gray-100">
      <div className="flex justify-end my-4">
        {btnLabel.map((btn, index) => (
          <ButtonTable key={index} label={btn.label} onClick={btn.onClick} />
        ))}
      </div>
      <h2 className="text-xl font-bold mb-4">Notes List</h2>
      {loading ? (
        <p>Loading notes...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Table columns={columns} data={notes} actions={actions} />
      )}
    </div>
  );
};

export default NoteList;