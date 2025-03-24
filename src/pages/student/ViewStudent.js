import React, { useEffect, useState } from "react";
import { fetchStudents, fetchUsers } from "../../api/user";
import Sidebar from "../../layout/Sidebar";

const StudentUsers = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");

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
                            {students && students.map((student) => (
                                <tr key={student._id}>
                                    <td className="py-2 px-4 border">{student.name}</td>
                                    <td className="py-2 px-4 border">{student.email}</td>
                                    <td className="py-2 px-4 border">{student.phone}</td>
                                    <td className="py-2 px-4 border">{student.education}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default StudentUsers;
