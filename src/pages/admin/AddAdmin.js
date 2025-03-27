import { useContext, useState } from "react";
import { useValidation } from "./../../components/Validation";
import { InputField } from "./../../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";

import { showAlertSuccess } from "../../components/Alert";
import Sidebar from "../../layout/Sidebar";

const AddAdmin = () => {
    const { handleSignup } = useAuth();

    const { errors, validateField } = useValidation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "isAdmin"
    });
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const fields = [
        { label: "Name", type: "text", name: "name", value: formData.name, required: true },
        { label: "Email", type: "email", name: "email", value: formData.email, required: true },
        { label: "Phone", type: "text", name: "phone", value: formData.phone, required: true },
        { label: "Password", type: "password", name: "password", value: formData.password, required: true },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await handleSignup(formData);
            showAlertSuccess("success", "Admin Added Successfully.", "success");
            navigate('/admin')
        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex min-h-[100vh] flex-col p-4 bg-gray-100">


        {/* Main Content */}
    <div className="">
                <div className="p-6 bg-white shadow-lg rounded-md">
                    <h2 className="text-xl font-semibold mb-4">Add Admin</h2>
                    <form onSubmit={handleSubmit}>
                        {fields.map((field) => (
                            <InputField
                                key={field.name}
                                label={field.label}
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required={field.required}
                                errors={errors}
                            />
                        ))}



                        <button className="btn btn-primary w-100 btn-signin mt-4">Create Admin</button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AddAdmin;
