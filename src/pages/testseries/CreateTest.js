import { useState } from "react";
import { useValidation } from "../../components/Validation";
import { InputField } from "../../components/InputField";
import { useNavigate } from "react-router-dom";
import { showAlertSuccess } from "../../components/Alert";
import Sidebar from "../../layout/Sidebar";
import { createTestSeries } from "../../api/testSeriesApi";

const AddTestSeries = () => {
    const { errors, validateField } = useValidation();
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        price: "",
        coverImage: null,
        pdfNote: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const fields = [
        { label: "Title", type: "text", name: "title", required: true },
        { label: "Category", type: "text", name: "category", required: true },
        { label: "Price", type: "number", name: "price", required: true }
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
        
        if (!formData.title || !formData.category || !formData.price) {
            alert("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);
        const testSeriesData = new FormData();
        testSeriesData.append("title", formData.title);
        testSeriesData.append("category", formData.category);
        testSeriesData.append("price", parseFloat(formData.price)); // Convert to number
        if (formData.coverImage) testSeriesData.append("coverImage", formData.coverImage);
        if (formData.pdfNote) testSeriesData.append("pdfNote", formData.pdfNote);

        console.log("Submitting Data:", Object.fromEntries(testSeriesData.entries())); // Debugging

        try {
            await createTestSeries(testSeriesData);
            showAlertSuccess("Success", "Test Series Added Successfully.", "success");
            navigate("/test-series");
        } catch (error) {
            console.error("Error adding test series:", error);
            alert("Error adding test series. Please check your input.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex h-screen">
            

            <div className="w-full sm:w-3/4 p-4 bg-gray-100">
                <div className="p-6 bg-white shadow-lg rounded-md">
                    <h2 className="text-xl font-semibold mb-4">Add Test Series</h2>
                    <form onSubmit={handleSubmit} className="w-full">
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

                        <button type="submit" className="btn btn-primary w-full mt-4" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Test Series"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTestSeries;
