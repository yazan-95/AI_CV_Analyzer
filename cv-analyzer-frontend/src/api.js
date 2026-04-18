import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const analyzeText = (data) =>
  API.post("/analyze", data);

export const analyzePDF = (formData) =>
  API.post("/analyze-pdf", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });