import React, { createContext, useState } from "react";
import { todosCollection } from "./../firebase/db";

export const DatabaseContext = createContext([{}, () => {}]);

export function DatabaseProvider(props) {
  const [todos, setFirebasetodos] = useState([]);

  const getTodos = () => {
    todosCollection.orderBy("createdOn", "desc").onSnapshot(querySnapshot => {
      setFirebasetodos([]);
      querySnapshot.forEach(doc => {
        setFirebasetodos(todos => [...todos, { id: doc.id, ...doc.data() }]);
      });
    });
  };

  return (
    <DatabaseContext.Provider
      value={{ todos, getTodos }}
    ></DatabaseContext.Provider>
  );
}
