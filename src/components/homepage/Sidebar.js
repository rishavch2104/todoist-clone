import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import { withStyles } from "@material-ui/styles";
import styles from "./../../styles/homepageStyles/StyleSidebar";
import { projectsCollection } from "./../../firebase/db";

const Sidebar = props => {
  const { classes, uid } = props;
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    projectsCollection.onSnapshot(querySnapshot => {
      setProjects([]);
      querySnapshot.forEach(doc => {
        setProjects(projects => [...projects, { id: doc.id, ...doc.data() }]);
      });
    });
  }, []);
  console.log(projects);

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
        <Divider variant="inset" />
        <ListItem button>
          <ListItemText className={classes.listitemtext} primary="Tommorow" />
        </ListItem>
        <Divider variant="inset" />
        <ListItem button>
          <ListItemText
            className={classes.listitemtext}
            primary="Next 7 days"
          />
        </ListItem>
        <Divider />
      </List>
      <List
        component="nav"
        className={classes.list}
        aria-label="mailbox folders"
        style={{ marginTop: "20px" }}
      >
        <ListItem button>
          <ListItemText className={classes.listitemtext} primary="Projects" />
        </ListItem>
        {projects.map(project => (
          <>
            <ListItem button>
              <ListItemText
                className={classes.listitemtext}
                primary={project.name}
              />
            </ListItem>
            <Divider variant="inset" />
          </>
        ))}

        {/*
          <ListItemText className={classes.listitemtext} primary="Trash" />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText className={classes.listitemtext} primary="Spam" />
        </ListItem> */}
      </List>
    </div>
  );
};

export default withStyles(styles)(Sidebar);
