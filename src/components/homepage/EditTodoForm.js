import React, { useContext } from "react";
import useInputState from "./../../hooks/useInputState";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import { editTodo } from "./../../firebase/db";
import { DialogContent, Dialog, DialogTitle } from "@material-ui/core";

function EditTodoForm(props) {
  const { toggleisEditing, id, task, projects } = props;
  const [value, handleChange, reset] = useInputState(task);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function onSubmit(e) {
    e.preventDefault();
    editTodo(id, value);
    reset();
    toggleisEditing();
  }
  let list = [];
  if (typeof projects != "undefined") {
    list = projects.map(project => (
      <MenuItem value={project} name={project}>
        {project}
      </MenuItem>
    ));
  }
  function handleMenuChange(e) {
    console.log(e);
  }

  return (
    <>
      <IconButton aria-label="Edit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog fullWidth onClose={handleClose} open={open}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <form
            onSubmit={onSubmit}
            style={{ marginLeft: "1rem", width: "50%" }}
          >
            <TextField
              margin="normal"
              value={value}
              onChange={handleChange}
              fullWidth
              autoFocus
            />
            <InputLabel id="demo-simple-select-label">Projects</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleMenuChange}
            >
              {list}
            </Select>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default EditTodoForm;
