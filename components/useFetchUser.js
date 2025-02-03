import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "../utils/axios";

export const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken");

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get("user/", {
        headers: {
          Authorization: `Bearer ${token}`,
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
    if (token) {
      fetchUser();
    }
    return null;
  }, [fetchUser]);

  return useMemo(() => ({ user, loading, error }), [user, loading, error]);
};
