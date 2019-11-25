import React, { useContext, useState } from "react";

import { Typography, Box } from "@material-ui/core";

import Navbar from "../Navbar";
import Sidebar from "./Sidebar";
import TodoList from "./TodoList";
import { getUserData } from "./../../firebase/auth";

const Home = props => {
  const [todolist, settodolist] = useState("");
  getUserData();

  return (
    <div>
      <main>
        <Navbar loggedin={true} />

        <Box margin="20px 200px 20px 200px" display="flex" flexDirection="row">
          <Sidebar settodolist={settodolist} />
          <TodoList list={todolist} />
        </Box>
      </main>
      )
    </div>
  );
};

export default Home;
