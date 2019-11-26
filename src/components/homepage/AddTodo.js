import React from "react";
import TextField from "@material-ui/core/TextField";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

import Paper from "@material-ui/core/Paper";
import useInputState from "./../../hooks/useInputState";
import { addTodo } from "./../../firebase/db";
import { getUserData } from "./../../firebase/auth";

function TodoForm() {
  const [value, handleChange, reset] = useInputState("");
  const { uid } = getUserData();

  function onSubmit(e) {
    e.preventDefault();
    addTodo({
      task: value,
      completion_date: null,
      userid: uid,
      createdOn: new Date()
    });
    reset();
  }
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  return (
    <MuiPickersUtilsProvider>
      <Paper style={{ margin: "0 0 0 400px", width: "50%", padding: "0 1rem" }}>
        <form onSubmit={onSubmit}>
          <TextField
            value={value}
            onChange={handleChange}
            margin="normal"
            label="Add New Todo"
            fullWidth
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </form>
      </Paper>
    </MuiPickersUtilsProvider>
  );
}
export default TodoForm;
