import React, { useContext, useState } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import useInputState from "./../../hooks/useInputState";
import { addProject } from "../../firebase/db";
import { AuthContext } from "./../../context/AuthContext";

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    textAlign: "center"
  }
}));

const AddProject = props => {
  const { uid } = useContext(AuthContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [project, handleProjectChange, reset] = useInputState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = e => {
    e.preventDefault();
    addProject({ name: project, userid: uid });

    handleClose();
    reset();
  };

  return (
    <>
      <Fab onClick={handleOpen} size="small" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Dialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="Login"
      >
        <DialogTitle className={classes.dialogTitle}>
          Add New Project
        </DialogTitle>
        <DialogContent dividers>
          <Box>
            <form onSubmit={handleSubmit}>
              <TextField
                multiline
                required
                id="standard-required"
                value={project}
                onChange={handleProjectChange}
                margin="normal"
                name="project"
                label="Add New Project"
                fullWidth
              />

              <Button onClick={handleSubmit}>ADD!</Button>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProject;
