import axios from "axios";

// Axios instance with a base URL

const instance = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export default instance;
