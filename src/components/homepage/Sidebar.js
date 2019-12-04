import React, { useContext } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles, useTheme } from "@material-ui/styles";
import { TodoGroupContext } from "./../../context/TodoGroupContext";

import CssBaseline from "@material-ui/core/CssBaseline";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import Projects from "./Projects";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },

  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const Sidebar = props => {
  const { container, mobileOpen, handleDrawerToggle } = props;
  const classes = useStyles();
  const { handleTodoGroupChange } = useContext(TodoGroupContext);

  const theme = useTheme();

  const drawer = (
    <div>
      <div className={classes.toolbar} style={{ alignContent: "center" }}>
        <Typography
          style={{ paddingTop: "20px", paddingLeft: "15px" }}
          variant="h6"
          noWrap
        >
          Todoist
        </Typography>
      </div>
      <Divider />

      <List>
        {["Today", "Tommorow", "Next 7 days"].map(text => (
          <ListItem
            button
            onClick={e => handleTodoGroupChange(e, text)}
            divider
            key={text}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />

      <Projects />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />

      <nav className={classes.drawer} aria-label="Sidebar">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};
Sidebar.propTypes = {
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  )
};

export default Sidebar;
