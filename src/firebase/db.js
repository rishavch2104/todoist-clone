import firebase from "./firebaseConnect";
import "firebase/firestore";

const firestore = firebase.firestore();
export const todosCollection = firestore.collection("todos");

export const projectsCollection = firestore.collection("projects");

export const usersCollection = firestore.collection("users");

export const addTodo = async todo => {
  return await todosCollection.add(todo);
};

export const deleteTodo = async id => {
  return await todosCollection.doc(id).delete();
};

export const editTodo = async (id, task, completion_timestamp, project) => {
  let documentRef = todosCollection.doc(id);
  return documentRef.update({
    task: task,
    completion_timestamp: completion_timestamp,
    project: project
  });
};

export const addProject = async project => {
  return await firestore.collection("projects").add(project);
};

export const editProjectName = async (id, project) => {
  let documentRef = projectsCollection.doc(id);
  return documentRef.update({
    name: project
  });
};

export const deleteProject = async id => {
  return await projectsCollection.doc(id).delete();
};

export const removeProjectFromTodo = (id, project) => {
  let documentRef = todosCollection.doc(id);
  return documentRef.update({
    projects: project
  });
};

export const addUser = async user => {
  return await usersCollection.add(user);
};

export const updateCompleted = async (complete, id) => {
  return await todosCollection.doc(id).update({
    completed: !complete
  });
};
