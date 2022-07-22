import React from "react";
import { List, ListItem, ListItemText, Grid } from "@mui/material";

const Tasks = (props) => {
  const upsertTask = (taskType, inputRef) => {
    props.upsertTask(taskType, { id: props.id, text: props.text }, inputRef);
  };

  const inputRef = React.createRef();

  return (
    <ListItem>
      <div>
        <span className="dot"></span>
      </div>
      <ListItemText
        primary={
          <Grid container className="todoTasksListContentTopContainer">
            <Grid
              item
              className={
                "todoTasksListContentMainContainer list " +
                (props.mode === "list" ? "active" : "inactive")
              }
            >
              <div className="todoTasksListContentContainer">
                <span className="todoTasksListContent">{props.text}</span>
              </div>
              <div className="btnContainer">
                <button
                  className="editBtn"
                  onClick={() => upsertTask("edit", inputRef)}
                >
                  Edit
                </button>
                <button
                  className="deleteBtn"
                  onClick={() => upsertTask("delete")}
                >
                  Delete
                </button>
              </div>
            </Grid>
            <Grid
              item
              className={
                "todoTasksListContentMainContainer edit " +
                (props.mode === "list" ? "inactive" : "active")
              }
            >
              <div className="todoTasksListContentContainer">
                <input
                  type="text"
                  ref={inputRef}
                  defaultValue={props.text}
                  className={props.updateErrorTxt !== "" ? "error" : ""}
                  onInput={() => upsertTask("inputValChanged")}
                  style={{ width: "95%" }}
                />
              </div>
              <div className="btnContainer">
                <button
                  className="saveBtn"
                  onClick={() => upsertTask("save", inputRef)}
                >
                  Save
                </button>
                <button
                  className="cancelBtn"
                  onClick={() => upsertTask("cancel", inputRef)}
                >
                  Cancel
                </button>
              </div>
            </Grid>
            {props.updateErrorTxt !== "" && (
              <span className="errorTxt">{props.updateErrorTxt}</span>
            )}
          </Grid>
        }
      />
    </ListItem>
  );
};

export default function TodoList(props) {
  return (
    <>
      <h2>
        <u style={{ color: "#ff9670" }}>TO DO TASK LISTS</u>
      </h2>
      <div className="todoTasksListMainContainer">
        <div className="todoTasksListInnerContainer">
          <List dense={true}>
            {props.tasks.map((task) => (
              <Tasks
                key={task.key}
                text={task.text}
                id={task.id}
                mode={task.mode}
                updateErrorTxt={task.updateErrorTxt}
                upsertTask={props.upsertTask}
              />
            ))}
          </List>
        </div>
      </div>
    </>
  );
}
