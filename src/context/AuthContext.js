import React, { useState, createContext } from "react";
import useToggle from "./../hooks/useToggle";

export const AuthContext = createContext([{}, () => {}]);

export function AuthProvider(props) {
  const [isLoggedIn, toggleisLoggedIn] = useState(false);
  const [uid, setUid] = useState("");
  const handleUidChange = uid => {
    setUid(uid);
    console.log(uid);
  };
  const handleLoginChange = toggle => {
    toggleisLoggedIn(toggle);
    console.log(isLoggedIn);
  };
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, handleLoginChange, uid, handleUidChange }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
