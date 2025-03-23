import { useState } from "react";
import { useValidation } from "./../../components/Validation";
import { InputField } from "./../../components/InputField";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { editProfile } from "../../api/user";

const Form = ({onSuccess}) => {
    const { errors, validateField } = useValidation();
    const [formData, setFormData] = useState({ gender: "", address: "", city: "" });
    const navigate = useNavigate();

    const fields = [
        // { label: "Name", type: "text", name: "name", required: true },
        {
            label: "Gender",
            type: "radio",
            name: "gender",
            required: true,
            options: [
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" }
            ]
        },
        { label: "Address", type: "textarea", name: "address", required: true },
        { label: "City", type: "text", name: "city", required: true, }

        // { label: "City", type: "text", name: "city", required: true, options: [
        //     { value: "ny", label: "New York" },
        //     { value: "la", label: "Los Angeles" },
        //     { value: "sf", label: "San Francisco" }
        // ]}
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editProfile(formData);
            onSuccess(); 
        } catch (error) {

        }
    };

    return (
        <div className="col-lg-12 px-4">
            <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <InputField
                        key={field.name}
                        label={field.label}
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        errors={errors}
                        required={field.required}
                        options={field.options || []}
                        className="form-control mb-3"
                    />
                ))}

                <button className="btn btn-primary w-100 btn-signin mt-4">Submit</button>

            </form>
        </div>
    );
};

export default Form;
