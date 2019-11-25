import React, { useEffect, useState } from "react";
import { Paper, Grid, List, Divider } from "@material-ui/core";
import Todo from "./Todo";
import { db } from "./../../firebase/auth";

const TodoList = props => {
  const [todos, settodos] = useState([]);
  useEffect(() => {
    const listener = db
      .collection("todos")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = doc.data();
          settodos(prev => {
            return [...prev, data];
          });
        });
      });
  }, []);
  console.log(todos);
  return (
    <Paper
      style={{
        padding: 0,
        margin: "0 0 0 20px",
        width: "70%",
        height: "100vh",
        backgroundColor: "#fafafa"
      }}
      elevation={0}
    >
      <List>
        {todos.map((todo, i) => (
          // To add a key to a fragment, we have to use the long-hand version
          // rather than <> </>, we have to use <React.Fragment>
          <React.Fragment key={i}>
            <Todo {...todo} key={todo.id} />
            {i < todos.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default TodoList;
