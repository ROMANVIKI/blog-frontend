import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // Enable sending cookies & credentials
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
