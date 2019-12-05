import React, { useState, useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import makeStyles from "@material-ui/styles/makeStyles";
import EditIcon from "@material-ui/icons/Edit";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import useInputState from "./../../hooks/useInputState";
import { editTodo } from "./../../firebase/db";
import { ProjectContext } from "./../../context/ProjectContext";

const useStyles = makeStyles(theme => ({
  form: { marginLeft: "1rem", display: "flex", flexDirection: "column" },
  dialogtitle: {
    backgroundColor: theme.palette.primary.main,
    textAlign: "center"
  }
}));

function EditTodoForm(props) {
  const { id, task, project, completion_timestamp } = props;
  const classes = useStyles();
  const [textValue, handleTextChange, reset] = useInputState(task);
  const { projects } = useContext(ProjectContext);
  const [selectProject, setSelectProject] = useState(project);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    completion_timestamp.toDate()
  );

  const deleteProject = () => {
    setSelectProject("");
  };
  const handleSelectChange = e => {
    setSelectProject(e.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleSubmit(e) {
    e.preventDefault();
    editTodo(id, textValue, selectedDate, selectProject);
    reset();
  }

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  return (
    <>
      <IconButton aria-label="Edit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog fullWidth onClose={handleClose} open={open}>
        <DialogTitle className={classes.dialogtitle}>Edit Todo</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="outlined-basic"
              label="Task"
              margin="normal"
              value={textValue}
              onChange={handleTextChange}
              fullWidth
              autoFocus
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-dialog"
                label="Completion Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>

            <Typography variant="h6">
              Project <DeleteIcon onClick={deleteProject} />
            </Typography>
            <Select value={selectProject} onChange={handleSelectChange}>
              {projects.map(project => (
                <MenuItem value={project.name}>{project.name}</MenuItem>
              ))}
            </Select>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default EditTodoForm;
