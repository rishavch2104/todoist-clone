import React, { useState, createContext } from "react";

export const ProjectContext = createContext([{}, () => {}]);

export function ProjectProvider(props) {
  const [projects, setProjects] = useState([]);

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {props.children}
    </ProjectContext.Provider>
  );
}
