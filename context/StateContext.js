"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  memo,
} from "react";

const StateContext = createContext(null);

export const StateProvider = memo(({ children }) => {
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

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ state, setState }), [state]);

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
});

export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useAppState must be used within a StateProvider");
  }
  return context;
}
