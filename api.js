import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Replace with your Django backend URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Assuming you use token authentication
    "Content-Type": "application/json",
  },
});

// Function to delete a like
export const deleteLike = (id) => {
  return axiosInstance.delete(`/dl-like/${id}/`);
};

// Function to delete a blog
export const deleteBlog = (id) => {
  return axiosInstance.delete(`/dl-blog/${id}/`);
};

// Function to delete a comment
export const deleteComment = (id) => {
  return axiosInstance.delete(`/dl-comment/${id}/`);
};

// Function to delete a saved blog
export const deleteSavedBlog = (id) => {
  return axiosInstance.delete(`/dl-saved-blog/${id}/`);
};
