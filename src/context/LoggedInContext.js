import React, { createContext } from "react";
import useToggle from "./../hooks/useToggle";

export const LoggedInContext = createContext([{}, () => {}]);

export function LoggedInContextProvider(props) {
  const [isLoggedIn, toggleLoggedIn] = useToggle(true);
  return (
    <LoggedInContext.Provider value={{ isLoggedIn, toggleLoggedIn }}>
      {props.children}
    </LoggedInContext.Provider>
  );
}
