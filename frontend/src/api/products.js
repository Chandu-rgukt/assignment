import axios from "axios";

const API = "http://localhost:5000/api/products";

export const getProducts = (params) =>
  axios.get(API, { params });

export const searchProducts = (query) =>
  axios.get(`${API}/search`, { params: { name: query } });

export const updateProduct = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const importCSV = (formData) =>
  axios.post(`${API}/import`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const exportCSV = () =>
  axios.get(`${API}/export`, { responseType: "blob" });

export const getHistory = (id) =>
  axios.get(`${API}/${id}/history`);
