import api from "./api";


export const fetchNotes = async () => {
    const response = await api.get(`/notes/view`);
    return response.data;
};

export const fetchNoteById = async (id) => {
    const response = await api.get(`/notes/view/${id}`);
    return response.data;
};

export const createNote = async (noteData) => {
    const response = await api.post(`/notes/create`, noteData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const updateNote = async (id, updatedData) => {
    const response = await api.put(`/notes/edit/${id}`, updatedData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const deleteNote = async (id) => {
    const response = await api.delete(`/notes/delete/${id}`)
    return response.data;
};

