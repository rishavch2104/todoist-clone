import * as firebase from "firebase";
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
  return await firestore.collection("todos").add(todo);
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

// export const getProjects= async user =>{

//     todosCollection
// }
