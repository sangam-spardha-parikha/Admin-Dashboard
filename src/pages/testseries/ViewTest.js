import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Table from "./../../components/Table"; // Adjust the import path as necessary
import { fetchNotes, deleteNote } from "../../api/notesApi"; // API functions
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import { ButtonTable } from "../../components/Button";

const TestList = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch data from API
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
      } catch (err) {
        console.warn(err.message);
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
        setNotes(notes.filter(note => note._id !== id));
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Category", accessor: "category" },
    { header: "Price", accessor: "price" }
  ];

  const actions = [
    {
      label: "View",
      icon: <FaEye />,
      color: "#28a745",
      onClick: (note) => navigate(`/view-note/${note._id}`), // Navigate to View Page
    },
    {
      label: "Edit",
      icon: <FaEdit />,
      color: "#ffc107",
      onClick: (note) => navigate(`/edit-note/${note._id}`), // Navigate to Edit Page
    },
    {
      label: "Delete",
      icon: <FaTrash />,
      color: "#dc3545",
      onClick: (note) => handleDelete(note._id),
    }
  ];

  const btnLabel = [
    {
      label: "Add Test",
      onClick: () => navigate("/add-test-series"), // Navigate to Add Test Page
    },
  ];

  return (
    <div className="flex min-h-[100vh] flex-col p-4 bg-gray-100">
 <div className="flex justify-end my-4">
        {btnLabel.map((btn, index) => (
          <ButtonTable key={index} label={btn.label} onClick={btn.onClick} />
        ))}
      </div>
      <h2 className="text-xl font-bold mb-4">Test Series List</h2>
      <Table columns={columns} data={notes} actions={actions} />
    </div>
  );
};

export default TestList;
