import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import makeStyles from "@material-ui/styles/makeStyles";
import { todosCollection } from "./../../firebase/db";
import { AuthContext } from "../../context/AuthContext";
import { ProjectContext } from "../../context/ProjectContext";
import { TodoGroupContext } from "../../context/TodoGroupContext";
import Todo from "./Todo";
import AddTodo from "./AddTodo";

const useStyles = makeStyles(theme => ({
  paper: {
    height: "100vh",
    backgroundColor: "#fafafa",
    flex: 1
  }
}));

const TodoList = props => {
  const { todoGroup } = useContext(TodoGroupContext);
  const { uid } = useContext(AuthContext);
  const { projects } = useContext(ProjectContext);
  const [firebaseTodos, setFirebasetodos] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (uid) {
      todosCollection.where("userid", "==", uid).onSnapshot(querySnapshot => {
        setFirebasetodos([]);

        querySnapshot.forEach(doc => {
          setFirebasetodos(firebaseTodos => [
            ...firebaseTodos,
            { id: doc.id, ...doc.data() }
          ]);
        });
      });
    }
  }, [uid]);
  let pagetodo = firebaseTodos;

  let today = new Date();

  pagetodo = firebaseTodos.filter(
    todo =>
      todo.completion_date ===
      `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
  );

  if (todoGroup === "Tommorow") {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    pagetodo = firebaseTodos.filter(
      todo =>
        todo.completion_date ===
        `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`
    );
  }
  if (projects.find(project => project.name === todoGroup)) {
    pagetodo = firebaseTodos.filter(todo => todo.project === todoGroup);
  }

  return (
    <Container className={classes.paper} elevation={0}>
      <AddTodo />
      <List>
        {pagetodo.map(todo => (
          <>
            <Todo {...todo} key={todo.id} />
            <Divider />
          </>
        ))}
      </List>
    </Container>
  );
};

export default withRouter(TodoList);
