import React, { useContext, useState } from "react";

import { Typography, Box } from "@material-ui/core";
import { getUserData } from "./../../firebase/auth";

import Navbar from "../Navbar";
import Sidebar from "./Sidebar";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
const Home = props => {
  const { uid } = getUserData();
  return (
    <div>
      <main>
        <Navbar loggedin={true} />

        <AddTodo />

        <Box margin="20px 200px 20px 200px" display="flex" flexDirection="row">
          <Sidebar uid={uid} />
          <TodoList uid={uid} />
        </Box>
      </main>
      )
    </div>
  );
};

export default Home;
