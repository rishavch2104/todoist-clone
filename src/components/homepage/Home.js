import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";

import { auth } from "./../../firebase/auth";
import { AuthContext } from "./../../context/AuthContext";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";
import TodoList from "./TodoList";

const Home = props => {
  const { history } = props;
  const { handleLoginChange, handleUidChange } = useContext(AuthContext);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        handleUidChange(user.uid);
        handleLoginChange(true);
      } else {
        handleLoginChange(false);
        history.push("/");
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

export default withRouter(Home);
