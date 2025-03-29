import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Table from "./../../components/Table"; // Adjust the import path as necessary
import { fetchStudents } from "../../api/user"; // API functions
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icons

const UsersAll = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); // Initialize navigate function

    // Fetch data from API
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchStudents();
                setUsers(data);
            } catch (err) {
                console.warn(err.message);
            }
        };
        loadUsers();
    }, []);

    // Delete Note


    const columns = [
        { header: "Name", accessor: "name" },
        { header: "Email", accessor: "email" },
        { header: "Phone", accessor: "phone" }
    ];

    const actions = [
        {
            label: "View",
            icon: <FaEye />,
            color: "#28a745",
            onClick: (note) => alert("we work on"), // Navigate to View Page
        },
    ];
  
    return (
        <div className="flex min-h-[100vh] flex-col p-4 bg-gray-100">
       
            <h2 className="text-xl font-bold mb-4">Users List</h2>
            <Table columns={columns} data={users} actions={actions} />
        </div>
    );
};

export default UsersAll;
