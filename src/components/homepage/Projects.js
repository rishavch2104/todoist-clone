import React, { useEffect, useContext } from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import AddProject from "./AddProject";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { projectsCollection } from "./../../firebase/db";
import Project from "./Project";

import { AuthContext } from "./../../context/AuthContext";
import { ProjectContext } from "./../../context/ProjectContext";
const useStyles = makeStyles(theme => ({
  heading: {
    paddingLeft: "15px",
    paddingTop: "30px"
  }
}));

const Projects = props => {
  const { uid } = useContext(AuthContext);
  const classes = useStyles();
  const { projects, setProjects } = useContext(ProjectContext);
  useEffect(() => {
    if (typeof uid !== "undefined") {
      projectsCollection
        .where("userid", "==", uid)
        .onSnapshot(querySnapshot => {
          setProjects([]);
          querySnapshot.forEach(doc => {
            setProjects(projects => [
              ...projects,
              { id: doc.id, ...doc.data() }
            ]);
          });
        });
    }
  }, [uid]);

  console.log(projects);
  console.log(uid);
  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography className={classes.heading} variant="h6">
          Projects
        </Typography>
        <AddProject uid={uid} />
      </Box>
      <List>
        <ListItem button></ListItem>

        {projects.map(project => (
          <Project {...project} key={project.key} />
        ))}
      </List>
    </>
  );
};

export default Projects;
