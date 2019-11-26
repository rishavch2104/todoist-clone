import React, { useEffect, useState, useContext } from "react";
import { Paper, Grid, List, Divider } from "@material-ui/core";
import Todo from "./Todo";

import { todosCollection, projectsCollection } from "./../../firebase/db";

const TodoList = props => {
  const [firebaseTodos, setFirebasetodos] = useState([]);
  const [projects, setProjects] = useState([]);
  const { uid } = props;

  useEffect(() => {
    console.log(uid);

    todosCollection.orderBy("createdOn", "desc").onSnapshot(querySnapshot => {
      setFirebasetodos([]);
      querySnapshot.forEach(doc => {
        console.log({ data: doc.data() });
        setFirebasetodos(firebaseTodos => [
          ...firebaseTodos,
          { id: doc.id, ...doc.data() }
        ]);
      });
    });
    projectsCollection.onSnapshot(querySnapshot => {
      setProjects([]);
      querySnapshot.forEach(doc => {
        setProjects(projects => [...projects, { id: doc.id, ...doc.data() }]);
      });
    });
  }, []);

  console.log(firebaseTodos, projects);
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
        {firebaseTodos.map(todo => (
          <>
            <Todo {...todo} key={todo.id} />
            <Divider />
          </>
        ))}
      </List>
    </Paper>
  );
};

export default TodoList;
