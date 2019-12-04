import React from "react";
import useInputState from "./../../hooks/useInputState";
import TextField from "@material-ui/core/TextField";
import { editProjectName } from "./../../firebase/db";
import { DialogContent, Dialog, DialogTitle } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const EditProject = props => {
  const { id, projectname, toggleEditForm } = props;
  const [value, handleChange, reset] = useInputState(projectname);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onSubmit(e) {
    e.preventDefault();
    editProjectName(id, value);
    reset();
    toggleEditForm();
  }

  return (
    <>
      <IconButton aria-label="Edit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog fullWidth onClose={handleClose} open={open}>
        <DialogTitle>Edit Project</DialogTitle>
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
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProject;
