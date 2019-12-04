import React, { useContext } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import useToggle from "./../../hooks/useToggle";
import EditProject from "./EditProject";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { ListItemSecondaryAction, Typography } from "@material-ui/core";
import { deleteProject } from "../../firebase/db";
import { TodoGroupContext } from "./../../context/TodoGroupContext";

const Project = props => {
  const { name, id } = props;
  const { handleTodoGroupChange } = useContext(TodoGroupContext);

  async function onRemoveProject() {
    try {
      const result = await deleteProject(id);
      console.log({ result });
    } catch (e) {
      console.log({ e });
    }
  }
  return (
    <>
      {" "}
      <ListItem
        alignItems="flex-start"
        button
        onClick={e => handleTodoGroupChange(e, name)}
        divider
      >
        <ListItemText
          style={{ maxWidth: "100px" }}
          primary={<Typography display="inline">{name}</Typography>}
        />
        <ListItemSecondaryAction>
          <EditProject id={id} projectname={name} />
          <IconButton aria-label="Delete" onClick={onRemoveProject}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default Project;
