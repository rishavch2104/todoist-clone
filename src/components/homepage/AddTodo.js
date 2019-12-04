import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import useInputState from "./../../hooks/useInputState";
import { addTodo } from "./../../firebase/db";
import { getUserData } from "./../../firebase/auth";
import {
  DialogTitle,
  DialogContent,
  MenuItem,
  Button
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import useForm from "../../hooks/useForm";

import { AuthContext } from "../../context/AuthContext";
import { ProjectContext } from "./../../context/ProjectContext";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: "auto"
}
  }
));

function AddTodo() {
  const [todo, handleTodoChange, reset] = useInputState("");
  const { uid } = useContext(AuthContext);

  const { projects } = useContext(ProjectContext);
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = date => {
    setSelectedDate(date);
    console.log(date.getDate());
  };

  const handleSubmit = e => {
    e.preventDefault();
    addTodo({
      task: todo,
      completion_date: `${selectedDate.getDate()}-${selectedDate.getMonth()}-${selectedDate.getFullYear()}`,
      userid: uid,
      createdOn: new Date(),
      project: project
    });

    handleClose();
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const [project, setProject] = useState("");

  const handleProjectSelectChange = event => {
    setProject(event.target.value);
  };

  return (
    <>
      <Fab
        className={classes.button}
        onClick={handleClickOpen}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>

      <Dialog fullWidth onClose={handleClose} open={open}>
        <DialogTitle>Add Todo</DialogTitle>

        <DialogContent>
          <Box>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={handleSubmit}
            >
              <TextField
                multiline
                required
                id="standard-required"
                value={todo}
                onChange={handleTodoChange}
                margin="normal"
                name="task"
                label="Add New Todo"
                style={{ width: "100%" }}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>

              <Typography variant="h6">Projects</Typography>
              <Select
                style={{ minWidth: "100px" }}
                value={project}
                onChange={handleProjectSelectChange}
              >
                {projects.map(project => (
                  <MenuItem value={project.name}>{project.name}</MenuItem>
                ))}
              </Select>

              <Button onClick={handleSubmit}>ADD!</Button>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddTodo;
