import React from "react";
import useToggle from "./../../hooks/useToggle";
import EditTodoForm from "./EditTodoForm";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import { deleteTodo } from "../../firebase/db";

function Todo(props) {
  const [isEditing, toggleisEditing] = useToggle(false);
  const { id, task, projects } = props;
  async function onRemoveTodo() {
    try {
      const result = await deleteTodo(id);
      console.log({ result });
    } catch (e) {
      console.log({ e });
    }
  }

  return (
    <ListItem style={{ height: "64px" }}>
      {isEditing ? (
        <EditTodoForm id={id} task={task} toggleEditForm={toggleisEditing} />
      ) : (
        <>
          <ListItemText>
            {task}
            {projects}
          </ListItemText>
          {/* <ListItemText>{projects.map(pro => pro)}</ListItemText> */}
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete" onClick={onRemoveTodo}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="Edit" onClick={toggleisEditing}>
              <EditIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  );
}

export default Todo;
