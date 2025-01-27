"use client";
import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext(null);

export function StateProvider({ children }) {
  const [state, setState] = useState({
    isLoggedIn: false,
    loggedUserName: "",
    AccessToken: "",
  });

  useEffect(() => {
    const localUserName = localStorage.getItem("userName");
    const localIsLogged = localStorage.getItem("isLogged");
    const accessToken = localStorage.getItem("accessToken");

    setState({
      isLoggedIn: localIsLogged === "true", // Convert string to boolean
      loggedUserName: localUserName || "",
      AccessToken: accessToken || "",
    });
  }, []);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
}

// Custom hook to access the context
export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useAppState must be used within a StateProvider");
  }
  return context;
}
