import React, { useState, createContext } from "react";

export const TodoGroupContext = createContext([{}, () => {}]);

export function TodoGroupContextProvider(props) {
  const [todoGroup, setTodoGroup] = useState("");
  const handleTodoGroupChange = (e, name) => {
    setTodoGroup(name);
    console.log(name);
  };

  return (
    <TodoGroupContext.Provider value={{ todoGroup, handleTodoGroupChange }}>
      {props.children}
    </TodoGroupContext.Provider>
  );
}
