"use client";
import { createContext, useContext, useState } from "react";

const StateContext = createContext(null);

export function StateProvider({ children }) {
  const localUserName = localStorage.getItem("userName");
  const localIsLogged = localStorage.getItem("isLogged");
  const [state, setState] = useState({
    isLoggedIn: localIsLogged ? true : false,
    loggedUserName: localUserName ? localUserName : "",
  });

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
}

// A custom hook to return the context
export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useAppState must be used within a StateProvider");
  }
  return context;
}
