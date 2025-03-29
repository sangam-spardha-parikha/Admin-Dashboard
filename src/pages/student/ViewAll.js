import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Table from "./../../components/Table"; // Adjust the import path as necessary
import { fetchUsers, deleteUser } from "../../api/user"; // API functions
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import { ButtonTable } from "../../components/Button";

const UsersAll = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); // Initialize navigate function

    // Fetch data from API
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                console.warn(err.message);
            }
        };
        loadUsers();
    }, []);

    // Delete Note
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this note?");
        if (confirmDelete) {
            try {
                await deleteUser(id);
                setUsers(users.filter(user => user._id !== id));
            } catch (error) {
                console.error("Error deleting note:", error);
            }
        }
    };

    const columns = [
        { header: "Name", accessor: "name" },
        { header: "Email", accessor: "email" },
        { header: "Phone", accessor: "phone" }
    ];

    const actions = [
      
        {
            label: "Edit",
            icon: <FaEdit />,
            color: "#ffc107",
            onClick: (user) => navigate(`/edit-staff/${user._id}`), // Navigate to Edit Page
        },
        {
            label: "Delete",
            icon: <FaTrash />,
            color: "#dc3545",
            onClick: (user) => handleDelete(user._id),
        }
    ];
    const btnLabel = [
        {
            label: "Add Staff",
            onClick: () => navigate("/add-staff"),
        },
    ];

    return (
        <div className="flex min-h-[100vh] flex-col p-4 bg-gray-100">
 <div className="flex justify-end my-4">
        {btnLabel.map((btn, index) => (
          <ButtonTable key={index} label={btn.label} onClick={btn.onClick} />
        ))}
      </div>
            <h2 className="text-xl font-bold mb-4">Staff List</h2>
            <Table columns={columns} data={users} actions={actions} />
        </div>
    );
};

export default UsersAll;
