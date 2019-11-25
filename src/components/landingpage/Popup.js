import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUp";

import { withStyles } from "@material-ui/styles";
// import toggleState from '../hooks/toggleState';
// import { toggleState } from './../hooks/toggleState';

const useStyles = makeStyles({
  openDialogButton: {
    border: "",
    color: "#fafafa"
  },
  dialogTitle: {
    color: "#ffff00",
    margin: "auto"
  }
});

function Popup(props) {
  const [currentTab, setCurrentTab] = useState("login");
  const [open, setOpen] = React.useState(false);
  const styles = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button className={styles.openDialogButton} onClick={handleClickOpen}>
        {props.name}
      </Button>
      <Dialog
        style={{ height: "800px" }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="Login"
      >
        <DialogTitle
          className={styles.dialogTitle}
          id="customized-dialog-title"
        >
          <Button onClick={() => setCurrentTab("login")}>Login</Button>
          <Button onClick={() => setCurrentTab("signup")}>Signup</Button>
        </DialogTitle>
        <DialogContent className={styles.DialogContent} dividers>
          {currentTab === "login" && <LoginForm />}
          {currentTab === "signup" && <SignUpForm />}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
export default Popup;
