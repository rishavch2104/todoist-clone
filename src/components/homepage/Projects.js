import React, { useState, useEffect, useContext } from "react";
import AddProject from "./AddProject";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { projectsCollection } from "./../../firebase/db";
import Project from "./Project";
import { Divider } from "@material-ui/core";
import { AuthContext } from "./../../context/AuthContext";
import { ProjectContext } from "./../../context/ProjectContext";

const Projects = props => {
  const { uid } = useContext(AuthContext);
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
      <ListItem button>
        <ListItemText primary="Projects" />
        <AddProject uid={uid} />
      </ListItem>

      {projects.map(project => (
        <Project {...project} key={project.key} />
      ))}
    </>
  );
};

export default Projects;
