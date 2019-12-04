import React from "react";
import useInputState from "./../../hooks/useInputState";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { editProjectName } from "./../../firebase/db";
import { DialogContent, Dialog, DialogTitle } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  dialogtitle: {
    backgroundColor: theme.palette.primary.main,
    textAlign: "center"
  }
}));

const EditProject = props => {
  const { id, projectname, toggleEditForm } = props;
  const classes = useStyles();
  const [value, handleChange, reset] = useInputState(projectname);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit(e) {
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
        <DialogTitle className={classes.dialogtitle}>Edit Project</DialogTitle>
        <DialogContent>
          <form handleSubmit={handleSubmit}>
            <TextField
              margin="normal"
              value={value}
              onChange={handleChange}
              autoFocus
            />
            <Button
              startIcon={<SaveIcon />}
              color="primary"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProject;
