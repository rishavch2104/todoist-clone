import firebase from "./firebaseConnect";
import "firebase/firestore";

const firestore = firebase.firestore();
export const todosCollection = firestore.collection("todos");

export const projectsCollection = firestore.collection("projects");

export const userTodos = () => {
  let todos = [];
  //   todosCollection.orderBy("createdOn", "desc").onSnapshot(querySnapshot => {
  //     querySnapshot.forEach(doc => {
  //       // console.log({ data: doc.data() });
  //       todos.push([...todos, { id: doc.id, ...doc.data() }]);
  //     });
  //   });
  //   return { todos };
};

export const addTodo = async todo => {
  return await todosCollection.add(todo);
};

export const deleteTodo = async id => {
  return await todosCollection.doc(id).delete();
};

export const editTodo = async (id, task) => {
  let documentRef = todosCollection.doc(id);
  return documentRef.update({
    task: task
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
// export const getProjects= async user =>{

//     todosCollection
// }
export const removeProjectFromTodo = (id, project) => {
  let documentRef = todosCollection.doc(id);
  return documentRef.update({
    projects: project
  });
};
