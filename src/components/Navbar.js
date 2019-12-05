import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DialogAuth from "./landingpage/DialogAuth";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Switch from "@material-ui/core/Switch";
import makeStyles from "@material-ui/styles/makeStyles";
import NoteIcon from "@material-ui/icons/Note";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "./../context/AuthContext";
import { logoutUser } from "../firebase/auth";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  icon: {
    marginRight: "10px"
  }
}));

function Navbar(props) {
  const { history, handleDrawerToggle } = props;
  const { isDarkMode, toggleTheme } = useContext(DarkModeContext);
  const { isLoggedIn } = useContext(AuthContext);
  const classes = useStyles();
  const buttons = [
    { name: "login", value: "login" },
    { name: "signup", value: "signup" }
  ];

  const handleSignoutClick = () => {
    logoutUser()
      .then(function() {
        if (isDarkMode === true) {
          toggleTheme();
        }
        history.push("/");
      })
      .catch(function(error) {});
  };
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          {isLoggedIn === true ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <br />

              <Button
                style={{ marginLeft: "auto" }}
                onClick={handleSignoutClick}
                size="large"
                color="inherit"
              >
                SignOut
              </Button>
              <Switch onChange={toggleTheme} />
            </>
          ) : (
            <>
              <NoteIcon className={classes.icon}></NoteIcon>

              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
              >
                Todoist
              </Typography>
              <Box display="flex" flexDirection="row" ml="auto">
                <DialogAuth buttons={buttons} />
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
export default withRouter(Navbar);
