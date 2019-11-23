import React, { createContext } from "react";
import useToggle from "./../hooks/useToggle";

export const ThemeContext = createContext([{}, () => {}]);

export function ThemeProvider(props) {
  const [isDarkMode, toggleTheme] = useToggle(false);
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
