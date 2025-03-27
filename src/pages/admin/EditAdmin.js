import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById, updateUser } from "../../api/admin";

const EditAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        role: "isStaff",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // Load user data
    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await fetchUserById(id);
                setUser({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    role: data.role,
                });
                setLoading(false);
            } catch (err) {
                setError("Failed to load user data.");
                setLoading(false);
            }
        };
        loadUser();
    }, [id]);

    // Handle form input change
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(id, user);
            navigate("/admin"); // Redirect after update
        } catch (err) {
            setError("Failed to update user.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Edit Admin </h2>

            {loading ? (
                <p>Loading user data...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-semibold">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            required
                        />
                    </div>

                   

                    <div className="mb-4">
                        <label className="block font-semibold">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            required
                        />
                    </div>

                  

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Update
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/admin")}
                        className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
};

export default EditAdmin;
