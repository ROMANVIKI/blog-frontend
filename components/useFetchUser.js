import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

export const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setUser(response.data);
      localStorage.setItem("userId", response.data.id);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return useMemo(() => ({ user, loading, error }), [user, loading, error]);
};
