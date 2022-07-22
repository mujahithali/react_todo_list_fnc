import React from "react";
import { Input, Button } from "@mui/material";

export default function TodoAdd(props) {
  const addTask = (e, inputRef) => {
    e.preventDefault();
    props.addTask(inputRef);
  };

  const inputValChanged = () => {
    props.inputValChanged();
  };

  const inputRef = React.createRef();

  return (
    <div className="todoTasksAddContainer">
      <h2>What's the task?</h2>
      <div>
        <form onSubmit={(e) => addTask(e, inputRef)}>
          <Input
            type="text"
            placeholder="Add a todo task"
            id="id_todoInput"
            autoComplete="off"
            inputRef={inputRef}
            disableUnderline
            onInput={inputValChanged}
            inputProps={{
              className: props.errorTxt !== "" ? "error" : "",
            }}
          />
          <Button type="submit" className="addBtn">
            ADD
          </Button>
        </form>
        {props.errorTxt !== "" && (
          <span className="errorTxt">{props.errorTxt}</span>
        )}
      </div>
    </div>
  );
}
