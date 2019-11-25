// export default function simpleFormHooks(initialVal) {
//   const [value, setValue] = useState(initialVal);
//   const handleChange = e => {
//     setValue(e.target.value);
//   };

//   return [value, handleChange];
// }

// import { useState } from "react";
// function simpleFormHooks(initialVal = false) {
//   const [state, setState] = useState(initialVal);
//   const handleChange = e => {
//     setState(e.target.value);
//   };

//   return [state, handleChange];
// }
// export default simpleFormHooks;

import { useState } from "react";

const useForm = initialVal => {
  const [values, setValues] = useState(initialVal);
  function handleChange(e) {
    console.log({ target: e });
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  }

  return [values, handleChange];
};

export default useForm;
