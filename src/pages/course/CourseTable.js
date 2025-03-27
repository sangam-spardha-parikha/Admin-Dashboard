import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CourseTable = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("/courses.json")  // Fetch JSON data
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error("Error loading courses:", error));
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Courses</h2>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">Title</th>
                        <th className="py-2 px-4 border">Category</th>
                        <th className="py-2 px-4 border">Price</th>
                        <th className="py-2 px-4 border">Cover Image</th>
                        <th className="py-2 px-4 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.id}>
                            <td className="py-2 px-4 border">{course.title}</td>
                            <td className="py-2 px-4 border">{course.category}</td>
                            <td className="py-2 px-4 border">₹{course.price}</td>
                            <td className="py-2 px-4 border">
                                <img src={course.coverImage} alt={course.title} className="w-16 h-16 object-cover"/>
                            </td>
                            <td className="py-2 px-4 border">
                                <Link to={`/courses/${course.id}`} className="text-blue-500 hover:underline">
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseTable;
