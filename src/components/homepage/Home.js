import React, { useContext, useState, useEffect } from "react";

import { Typography, Box } from "@material-ui/core";
import { getUserData } from "./../../firebase/auth";
import { ThemeProvider } from "../../context/DarkModeContext";
import { auth } from "./../../firebase/auth";
import { AuthContext, AuthProvider } from "./../../context/AuthContext";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";
import TodoList from "./TodoList";
import Temp from "./Sidebar";
const Home = props => {
  const { isLoggedIn, handleLoginChange, handleUidChange } = useContext(
    AuthContext
  );

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        handleUidChange(user.uid);
        handleLoginChange(true);
        console.log(user);
      } else {
        handleLoginChange(false);
      }
    });
  });

  return (
    <>
      <Navbar handleDrawerToggle={handleDrawerToggle} />

      <Box mt={2} width="100%" display="flex">
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />

        <TodoList />
      </Box>
    </>
  );
};

export default Home;
