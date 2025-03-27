import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchNoteById, updateNote } from "../../api/notesApi";
import { showAlertSuccess } from "../../components/Alert";
import Sidebar from "../../layout/Sidebar";

const EditNote = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        price: "",
    });

    const [coverImage, setCoverImage] = useState(null);
    const [pdfNote, setPdfNote] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            const note = await fetchNoteById(id);
            setFormData({
                title: note.title,
                category: note.category,
                price: note.price,
            });
        };
        fetchNote();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", formData.title);
        data.append("category", formData.category);
        data.append("price", formData.price);
        if (coverImage) data.append("coverImage", coverImage);
        if (pdfNote) data.append("pdfNote", pdfNote);

        await updateNote(id, data);
        showAlertSuccess("success", "Note Updated Successfully!", "success");
        navigate("/notes");
    };

    return (
        <div className="flex min-h-[100vh] flex-col p-4 bg-gray-100">
            
            <div className="">
                <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
                    <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
                    <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
                    <input type="file" onChange={(e) => setCoverImage(e.target.files[0])} />
                    <input type="file" onChange={(e) => setPdfNote(e.target.files[0])} />
                    <button type="submit">Update Note</button>
                </form>
            </div>
        </div>
    );
};

export default EditNote;
