import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/styles";
import styles from "./../../styles/homepageStyles/StyleSidebar";

const Sidebar = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List
        component="nav"
        className={classes.list}
        aria-label="mailbox folders"
      >
        <ListItem button>
          <ListItemText className={classes.listitemtext} primary="Today" />
        </ListItem>
        <Divider />
        <ListItem button divider>
          <ListItemText className={classes.listitemtext} primary="Drafts" />
        </ListItem>
        <ListItem button>
          <ListItemText className={classes.listitemtext} primary="Trash" />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText className={classes.listitemtext} primary="Spam" />
        </ListItem>
      </List>
    </div>
  );
};

export default withStyles(styles)(Sidebar);
