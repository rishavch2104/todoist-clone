import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";

import { auth } from "./../../firebase/auth";
import { AuthContext } from "./../../context/AuthContext";
import { usersCollection } from "./../../firebase/db";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";
import TodoList from "./TodoList";
import { DarkModeContext } from "../../context/DarkModeContext";

const Home = props => {
  const { history } = props;
  const { handleLoginChange, handleUidChange } = useContext(AuthContext);
  const { toggleTheme } = useContext(DarkModeContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        usersCollection
          .where("userid", "==", user.uid)
          .onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
              if (doc.data().darkMode === true) {
                toggleTheme();
              }
            });
          });
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

      <Box pt={2} width="100%" display="flex">
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
