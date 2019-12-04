import React, { createContext } from "react";
import useToggle from "../hooks/useToggle";

export const DarkModeContext = createContext([{}, () => {}]);

export function DarkModeProvider(props) {
  const [isDarkMode, toggleTheme] = useToggle(true);
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {props.children}
    </DarkModeContext.Provider>
  );
}
