import React from "react";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";

import DeleteIcon from "@material-ui/icons/Delete";
import makeStyles from "@material-ui/styles/makeStyles";
import { deleteTodo, updateCompleted } from "../../firebase/db";
import EditTodoForm from "./EditTodoForm";
const useStyles = makeStyles(theme => ({
  task: {
    width: "30vh",
    [theme.breakpoints.down("md")]: {
      width: "40vh"
    },
    [theme.breakpoints.down("sm")]: {
      width: "30vh"
    },

    wordWrap: "break-word"
  }
}));

function Todo(props) {
  const {
    id,
    task,
    project,
    completion_timestamp,
    completed,
    completion_date
  } = props;
  const classes = useStyles();
  async function onRemoveTodo() {
    try {
      const result = await deleteTodo(id);
      console.log({ result });
    } catch (e) {
      console.log({ e });
    }
  }

  return (
    <>
      <ListItem>
        <Grid container>
          <Grid item md={6} sm={12} lg={6}>
            <ListItemText>
              <Typography
                className={classes.task}
                style={{ textDecoration: completed ? "line-through" : "none" }}
              >
                {task}
              </Typography>
            </ListItemText>
          </Grid>
          <Grid item md={3} sm={6} lg={3}>
            <Chip label={completion_date} />
            {project && <Chip label={project} />}
          </Grid>

          <Grid item md={3} sm={6} lg={3}>
            <Checkbox
              checked={completed}
              onClick={() => updateCompleted(completed, id)}
            />
            <IconButton aria-label="Delete" onClick={onRemoveTodo}>
              <DeleteIcon />
            </IconButton>
            <EditTodoForm
              project={project}
              id={id}
              task={task}
              completion_timestamp={completion_timestamp}
            />
          </Grid>
        </Grid>
      </ListItem>
    </>
  );
}

export default Todo;
