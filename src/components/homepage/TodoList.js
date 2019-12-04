import React, { useEffect, useState, useContext } from "react";
import { Paper, Grid, List, Divider } from "@material-ui/core";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

import { todosCollection } from "./../../firebase/db";
import { AuthContext } from "../../context/AuthContext";
import {ProjectContext} from '../../context/ProjectContext'
import {TodoGroupContext} from '../../context/TodoGroupContext'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: "0",
    height: "100vh",
    backgroundColor: "#fafafa",
    flex: 0.9,
    paddingLeft: "8%"
  }
}));

const TodoList = props => {
  const {todoGroup}= useContext(TodoGroupContext);
  const { uid } = useContext(AuthContext);
  const {projects}= useContext(ProjectContext)
  const [firebaseTodos, setFirebasetodos] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    console.log(uid);
    if (uid) {
      todosCollection.where("userid", "==", uid).onSnapshot(querySnapshot => {
        setFirebasetodos([]);
        console.log({ querySnapshot });
        querySnapshot.forEach(doc => {
          console.log({ data: doc.data() });
          setFirebasetodos(firebaseTodos => [
            ...firebaseTodos,
            { id: doc.id, ...doc.data() }
          ]);
        });
      });
    }
  }, [uid]);
  let pagetodo = firebaseTodos;
  console.log(projects)
  if (todoGroup === "Today") {
    let today= new Date();
    pagetodo = firebaseTodos.filter(
      todo =>
        todo.completion_date ===
        `${today.getDate()}-${today.getMonth() +1}-${today.getFullYear()}`
    );
    console.log(today.getDate(),today.getMonth(),today.getFullYear());
  }
  if (todoGroup === "Tommorow") {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    pagetodo = firebaseTodos.filter(
      todo =>
        todo.completion_date ===
        `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`
    );
    console.log(pagetodo);
  }
  if(projects.find(project =>project.name === todoGroup)){
    console.log('working')
    pagetodo= firebaseTodos.filter(todo=>todo.project === todoGroup)
  }

  return (
    <Paper className={classes.paper} elevation={0}>
      <AddTodo />
      <List>
        {pagetodo.map(todo => (
          <>
            <Todo {...todo} key={todo.id} />
            <Divider />
          </>
        ))}
      </List>
    </Paper>
  );
};

export default withRouter(TodoList);
