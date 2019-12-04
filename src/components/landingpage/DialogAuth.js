import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core/styles";
import ReactCardFlip from "react-card-flip";
import Box from "@material-ui/core/Box";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUp";

const useStyles = makeStyles(theme => ({
  openDialogButton: {
    border: "",
    color: "#fafafa"
  },

  box: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  button: {
    fontSize: "25px",
    color: "#ffffff"
  }
}));

const DialogAuth = props => {
  const { buttons } = props;
  const [open, handleopen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(true);

  const [currentTab, setCurrentTab] = useState("");

  const handleSigInUp = tab => {
    console.log(currentTab, tab);
    if (currentTab !== tab) {
      setIsFlipped(!isFlipped);
      setCurrentTab(tab);
    }
  };

  const handleClick = tab => {
    setCurrentTab(tab);
    if (tab === "login") {
      setIsFlipped(false);
    } else {
      setIsFlipped(true);
    }
    handleopen(true);
  };

  const handleClose = () => {
    handleopen(false);
  };
  const styles = useStyles();
  return (
    <>
      {buttons.map(button => (
        <Button
          size="auto"
          onClick={() => handleClick(button.value)}
          color="inherit"
          {...button.props}
        >
          {button.name}
        </Button>
      ))}
      <Dialog
        style={{ height: "800px" }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="Login"
      >
        <DialogTitle className={styles.box}>
          <Button
            className={styles.button}
            style={{ diplay: "inline-block" }}
            size="large"
            onClick={() => handleSigInUp("login")}
          >
            Login
          </Button>
          <Button
            style={{ diplay: "inline-block" }}
            className={styles.button}
            size="large"
            onClick={() => handleSigInUp("signup")}
          >
            Signup
          </Button>
        </DialogTitle>
        <DialogContent className={styles.DialogContent} dividers>
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <Box>
              <LoginForm />
            </Box>
            <Box>
              <SignUpForm />
            </Box>
          </ReactCardFlip>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogAuth;
