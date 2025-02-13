// components/useFetchUser.js
"use client"; // Add this if not already present

import { useState, useEffect } from "react";

const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null); // <--- Add this line

  useEffect(() => {
    // Access localStorage ONLY in useEffect (client-side)
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);

  const fetchUser = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get("/user/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return { user, loading, error };
};

export default useFetchUser;
