import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Popup from "./Popup";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import styles from "./../styles/StyleNavbar";
import { ThemeContext, ThemeProvider } from "./../context/ThemeContext";
import NoteIcon from "@material-ui/icons/Note";

function Navbar(props) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const { classes } = props;

  return (
    <div className={classes.root}>
      <ThemeProvider>
        <AppBar position="static" color={isDarkMode ? "default" : "primary"}>
          <Toolbar>
            <NoteIcon className={classes.menuButton}></NoteIcon>

            <Typography className={classes.title} variant="h6" color="inherit">
              Todoist
            </Typography>
            <Switch onChange={toggleTheme} />
            {/* <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />-
              </div>
              <InputBase
                placeholder={`search...`}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div> */}
            <Box display="flex" flexDirection="row" ml="auto">
              <Popup name="login" />
              <Popup name="signup" />
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}
export default withStyles(styles)(Navbar);
