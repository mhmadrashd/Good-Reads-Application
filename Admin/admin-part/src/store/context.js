import React, { useReducer, createContext, useEffect } from "react";
import reducer from "./reducer";

export const initialState = {
  user: null,
  isAuthenticated: false,
};

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  let [currentUserInfo, setCurrentUserInfo] = useReducer(reducer, initialState);

  useEffect(() => {
    const storageValue = localStorage.getItem("currentUserInfo");
    if (storageValue) {
      currentUserInfo = JSON.parse(storageValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentUserInfo", JSON.stringify(currentUserInfo));
  }, [currentUserInfo]);

  return (
    <div>
      <AuthContext.Provider value={{ currentUserInfo, setCurrentUserInfo }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
}

// export  AuthContext, AuthProvider ;
