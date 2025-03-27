import { useState } from "react";
import { useValidation } from "./../../components/Validation";
import { InputField } from "./../../components/InputField";
import { useNavigate } from "react-router-dom";
import { showAlertSuccess } from "../../components/Alert";
import Sidebar from "../../layout/Sidebar";
import { createTestSeries } from "./../../api/testSeriesApi";

const AddTestSeries = () => {
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
        { label: "Price", type: "number", name: "price", value: formData.price, required: true }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for missing required fields
        if (!formData.title || !formData.category || !formData.price) {
            alert("Please fill in all required fields.");
            return;
        }

        const testSeriesData = new FormData();
        testSeriesData.append("title", formData.title);
        testSeriesData.append("category", formData.category);
        testSeriesData.append("price", parseFloat(formData.price)); // Convert to number
        if (formData.coverImage) testSeriesData.append("coverImage", formData.coverImage);
        if (formData.pdfNote) testSeriesData.append("pdfNote", formData.pdfNote);

        console.log("Submitting Data:", Object.fromEntries(testSeriesData)); // Debugging

        try {
            await createTestSeries(testSeriesData);
            showAlertSuccess("Success", "Test Series Added Successfully.", "success");
            navigate("/test-series");
        } catch (error) {
            console.error("Error adding test series:", error);
            alert("Error adding test series. Please check your input.");
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
                <div className="p-6 bg-white shadow-lg rounded-md max-w-full">
                    <h2 className="text-xl font-semibold mb-4 w-full">Add Test Series</h2>
                    <form onSubmit={handleSubmit} className="max-w-full" style={{width :"100%"}}>
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
                        <input type="file" name="coverImage" accept="image/*" onChange={handleFileChange} className="border p-2 w-full" />

                        <label className="block mt-4">PDF Note</label>
                        <input type="file" name="pdfNote" accept="application/pdf" onChange={handleFileChange} className="border p-2 w-full" />

                        <button type="submit" className="btn btn-primary w-full mt-4">Create Test Series</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTestSeries;
