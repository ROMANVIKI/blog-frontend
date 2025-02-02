import axios from "axios";

// Axios instance with a base URL

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
});

export default instance;
