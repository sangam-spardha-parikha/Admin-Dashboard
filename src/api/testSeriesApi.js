import api from "./api";

// ✅ Fetch All Test Series
export const fetchTestSeries = async () => {
    const response = await api.get(`/testseries/view`);
    return response.data;
};

// ✅ Fetch Single Test Series by ID
export const fetchTestSeriesById = async (id) => {
    const response = await api.get(`/testseries/view/${id}`);
    return response.data;
};

// ✅ Create a Test Series
export const createTestSeries = async (formData) => {
    const response = await api.post(`/testseries/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

// ✅ Update Test Series
export const updateTestSeries = async (id, formData) => {
    const response = await api.put(`/testseries/edit/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

// ✅ Delete Test Series
export const deleteTestSeries = async (id) => {
    const response = await api.delete(`/testseries/delete/${id}`);
    return response.data;
};
