import React from "react";
import Navbar from "../Navbar";
import { ThemeProvider } from "../../context/ThemeContext";

const WelcomeScreen = () => {
  return (
    <div>
      <ThemeProvider>
        <Navbar loggedin={false} />
      </ThemeProvider>
    </div>
  );
};

export default WelcomeScreen;
