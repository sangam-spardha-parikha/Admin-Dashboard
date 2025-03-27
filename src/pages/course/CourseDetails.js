import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        fetch("/courses.json")
            .then(response => response.json())
            .then(data => {
                const selectedCourse = data.find(c => c.id === parseInt(id));
                setCourse(selectedCourse);
            })
            .catch(error => console.error("Error loading course details:", error));
    }, [id]);

    if (!course) return <p className="p-6 text-center">Loading course details...</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
            <img src={course.coverImage} alt={course.title} className="w-64 h-40 object-cover rounded mb-4"/>
            <p className="text-lg"><strong>Category:</strong> {course.category}</p>
            <p className="text-lg"><strong>Price:</strong> ₹{course.price}</p>
            <p className="text-lg mb-4"><strong>Description:</strong> {course.description}</p>

            <h3 className="text-2xl font-semibold mt-6">Video Lessons</h3>
            <ul className="mt-2">
                {course.videoCourses.map((video, index) => (
                    <li key={index} className="mb-2">
                        <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {video.title}
                        </a>
                    </li>
                ))}
            </ul>

            <Link to="/course" className="mt-6 inline-block text-blue-500 hover:underline">Back to Courses</Link>
        </div>
    );
};

export default CourseDetails;
