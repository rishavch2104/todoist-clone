import React, { useContext } from "react";
import useToggle from "./../../hooks/useToggle";
import EditTodoForm from "./EditTodoForm";
import Chip from "@material-ui/core/Chip";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import { deleteTodo, removeProjectFromTodo } from "../../firebase/db";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  text: {
    maxWidth: "70%",
    wordWrap: "break-word",
    whiteSpace: "initial"
  }
}));

function Todo(props) {
  const [isEditing, toggleisEditing] = useToggle(false);
  const { id, task, project, completion_date } = props;
  const classes = useStyles();
  async function onRemoveTodo() {
    try {
      const result = await deleteTodo(id);
      console.log({ result });
    } catch (e) {
      console.log({ e });
    }
  }
  // const handleProjectDelete = e => {
  //   console.info("You clicked the delete icon.");
  //   let updatedProjects = projects.filter(project => project == e.target.name);
  //   console.log(updatedProjects);
  //   removeProjectFromTodo(id, updatedProjects);
  // };
  // console.log(projects);

  return (
    <>
      <ListItem style={{ height: "64px" }}>
        <ListItemText>
          <Typography className={classes.text}>{task}</Typography>
         
          
        </ListItemText>
        {/* <ListItemText>{projects.map(pro => pro)}</ListItemText> */}
        <ListItemSecondaryAction>
          <Checkbox></Checkbox>
          <IconButton aria-label="Delete" onClick={onRemoveTodo}>
            <DeleteIcon />
          </IconButton>
          <EditTodoForm project={project} id={id} task={task} />
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
}

export default Todo;
