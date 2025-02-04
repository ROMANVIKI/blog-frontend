"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

const StateContext = createContext(null);

export const StateProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoggedIn: false,
    loggedUserName: "",
    AccessToken: undefined,
    isLoading: true,
  });

  useEffect(() => {
    const localUserName = localStorage.getItem("userName");
    const localIsLogged = localStorage.getItem("isLogged");
    const accessToken = localStorage.getItem("accessToken");

    setState({
      isLoggedIn: localIsLogged === "true",
      loggedUserName: localUserName || "",
      AccessToken: accessToken || "",
      isLoading: false,
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      state,
      setState: (newState) => {
        setState((prev) => ({
          ...prev,
          ...newState,
        }));
      },
    }),
    [state],
  );

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useAppState must be used within a StateProvider");
  }
  return context;
}
