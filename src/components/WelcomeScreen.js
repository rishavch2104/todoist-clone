import React from "react";
import Navbar from "./Navbar";
import { ThemeProvider } from "../context/ThemeContext";

const WelcomeScreen = () => {
  return (
    <div>
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    </div>
  );
};

export default WelcomeScreen;
