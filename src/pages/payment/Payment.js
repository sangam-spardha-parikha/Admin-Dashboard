import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Table from "./../../components/Table"; // Adjust the import path as necessary

import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import { ButtonTable } from "../../components/Button";

const Payment = () => {
  const [pay, setPay] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch data from API
  useEffect(() => {
    fetch("/pay.json")  // Fetch JSON data
        .then(response => response.json())
        .then(data => setPay(data))
        .catch(error => console.error("Error loading courses:", error));
}, []);

  

  const columns = [
    { header: "Course", accessor: "course" },
    { header: "Student", accessor: "student" },
    { header: "Payment", accessor: "payment" },
    { header: "Date", accessor: "date" }
  ];

  const actions = [
    {
      label: "View",
      icon: <FaEye />,
      color: "#28a745",
      onClick: (pay) => navigate(`/view-pay/${pay._id}`), // Navigate to View Page
    },
   
  ];



  return (
    <div className="flex min-h-[100vh] flex-col p-4 bg-gray-100">
 
      <h2 className="text-xl font-bold mb-4">Payment List</h2>
      <Table columns={columns} data={pay} actions={actions} />
    </div>
  );
};

export default Payment;
