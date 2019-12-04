import React, { useContext } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Paper, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import useInputState from "./../../hooks/useInputState";
import { addProject } from "../../firebase/db";
import { AuthContext } from "./../../context/AuthContext";
import { DialogTitle, DialogContent, Button, Box } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  openDialogButton: {
    border: "",
    color: "#fafafa"
  },
  dialogTitle: {
    color: "#ffff00",
    margin: "auto"
  },
  box: {
    backgroundColor: "#3f51b5",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  button: {
    fontSize: "25px",
    color: "#ffffff"
  }
}));

const AddProject = props => {
  const { uid } = useContext(AuthContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
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
      <Fab
        onClick={handleOpen}
        size="small"
        color="primary"
        aria-label="add"
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
      <Dialog
        style={{ height: "800px" }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="Login"
      >
        <DialogTitle className={classes.box}>Add New Project</DialogTitle>
        <DialogContent className={classes.DialogContent} dividers>
          <Box>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={handleSubmit}
            >
              <TextField
                multiline
                required
                id="standard-required"
                value={project}
                onChange={handleProjectChange}
                margin="normal"
                name="project"
                label="Add New Project"
                style={{ width: "100%" }}
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
