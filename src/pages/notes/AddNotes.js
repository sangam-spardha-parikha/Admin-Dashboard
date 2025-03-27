import { useState } from "react";
import { useValidation } from "./../../components/Validation";
import { InputField } from "./../../components/InputField";
import { useNavigate } from "react-router-dom";
import { showAlertSuccess } from "../../components/Alert";
import Sidebar from "../../layout/Sidebar";
import { createNote } from "./../../api/notesApi";

const AddNotes = () => {
    const { errors, validateField } = useValidation();
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        price: "",
        coverImage: null,
        pdfNote: null
    });
    
    const navigate = useNavigate();

    const fields = [
        { label: "Title", type: "text", name: "title", value: formData.title, required: true },
        { label: "Category", type: "text", name: "category", value: formData.category, required: true },
        { label: "Price", type: "text", name: "price", value: formData.price, required: true }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const noteData = new FormData();
        Object.keys(formData).forEach((key) => {
            noteData.append(key, formData[key]);
        });

        try {
            await createNote(noteData);
            showAlertSuccess("Success", "Note Added Successfully.", "success");
            navigate("/notes");
        } catch (error) {
            alert("Error adding note");
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="w-full sm:w-3/4 p-4 bg-gray-100 max-w-full">
                <div className="p-6 bg-white shadow-lg rounded-md">
                    <h2 className="text-xl font-semibold mb-4">Add Note</h2>
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

                        <label className="block mt-4">Cover Image</label>
                        <input type="file" name="coverImage" onChange={handleFileChange} className="border p-2 w-full" />

                        <label className="block mt-4">PDF Note</label>
                        <input type="file" name="pdfNote" onChange={handleFileChange} className="border p-2 w-full" />

                        <button className="btn btn-primary w-100 btn-signin mt-4">Create Note</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNotes;