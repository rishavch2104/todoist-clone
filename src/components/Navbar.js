import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";

import { DarkModeContext } from "../context/DarkModeContext";
import NoteIcon from "@material-ui/icons/Note";
import Sidebar from "./homepage/Sidebar";
import { logoutUser } from "../firebase/auth";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DialogAuth from "./landingpage/DialogAuth";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { AuthContext, AuthProvider } from "./../context/AuthContext";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
}));

function Navbar(props) {
  const { toggleTheme } = useContext(DarkModeContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { history, handleDrawerToggle } = props;
  const classes = useStyles();
  const buttons = [
    { name: "login", value: "login" },
    { name: "signup", value: "signup" }
  ];

  const handleSignoutClick = () => {
    logoutUser()
      .then(function() {
        history.push("/");
      })
      .catch(function(error) {});
  };
  return (
    <div className={classes.root}>
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
              <NoteIcon className={classes.menuButton}></NoteIcon>
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
    </div>
  );
}
export default withRouter(Navbar);
