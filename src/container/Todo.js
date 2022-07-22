import React, { useState, useEffect } from "react";
import TodoAdd from "../components/TodoAdd";
import TodoList from "../components/TodoList";
import "../assets/css/Todo.css";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [addErrorTxt, setAddErrorTxt] = useState("");
  const [taskListArr, setTaskListArr] = useState([]);
  const [errorTxt] = useState({
    empty: "Oops! Empty task cannot be add.",
    duplicate: "Oops! Given task is already added.",
  });

  useEffect(() => {
    console.log("rendering todo tasks...");
  });

  const addTask = (inputTaskRef) => {
    let inputTask =
      inputTaskRef && inputTaskRef.current && inputTaskRef.current.value
        ? inputTaskRef.current.value.trim()
        : "";

    if (!inputTask) {
      setAddErrorTxt(errorTxt["empty"]);
      return false;
    } else if (taskListArr.includes(inputTask.toLowerCase())) {
      setAddErrorTxt(errorTxt["duplicate"]);
      return false;
    } else if (inputTask) {
      setAddErrorTxt("");
      let dateNow = Date.now();
      let newItem = {
        text: inputTask,
        key: dateNow,
        id: inputTask + "_" + dateNow,
        mode: "list",
        updateErrorTxt: "",
      };

      let updatedTaskList = [...taskListArr];
      updatedTaskList.push(inputTask.toLowerCase());
      setTaskListArr(updatedTaskList);
      setTasks((prevTasks) => {
        let prevItems = [...prevTasks];
        prevItems.map((arrVal) => {
          arrVal.mode = "list";
          arrVal.updateErrorTxt = "";
          return arrVal;
        });
        return prevItems.concat(newItem);
      });

      inputTaskRef.current.value = "";
    }
  };

  const inputValChanged = () => {
    setAddErrorTxt("");
  };

  const upsertTask = (taskType, dataObj, inputRef) => {
    switch (taskType) {
      case "edit":
        editTask(dataObj, inputRef);
        break;
      case "delete":
        deleteTask(dataObj);
        break;
      case "cancel":
        editCancel(dataObj, inputRef);
        break;
      case "save":
        editSave(dataObj, inputRef);
        break;
      case "inputValChanged":
        updateInputValChanged(dataObj);
        break;
      default:
        break;
    }
  };

  const editTask = (dataObj, inputRef) => {
    let updatedTasks = tasks.map((arrVal) => {
      if (arrVal.id === dataObj.id) {
        arrVal.mode = "edit";
        inputRef.current.value = arrVal.text;
      }
      return arrVal;
    });
    setTasks(updatedTasks);
  };

  const editCancel = (dataObj, inputRef) => {
    let updatedTasks = tasks.map((arrVal) => {
      if (arrVal.id === dataObj.id) {
        arrVal.mode = "list";
        arrVal.updateErrorTxt = "";
        inputRef.current.value = arrVal.text;
      }
      return arrVal;
    });
    setTasks(updatedTasks);
  };

  const editSave = (dataObj, inputRef) => {
    let newTaskVal =
      inputRef && inputRef.current && inputRef.current.value
        ? inputRef.current.value.trim()
        : "";

    let updatedTasks = tasks.map((arrVal) => {
      const oldTaskVal = arrVal.text;
      if (arrVal.id === dataObj.id) {
        if (!newTaskVal) {
          arrVal.updateErrorTxt = errorTxt["empty"];
        } else if (
          taskListArr.includes(newTaskVal.toLowerCase()) &&
          oldTaskVal.toLowerCase() !== newTaskVal.toLowerCase()
        ) {
          arrVal.updateErrorTxt = errorTxt["duplicate"];
        } else if (newTaskVal) {
          let itemIdx = taskListArr.indexOf(oldTaskVal.toLowerCase());
          if (itemIdx !== -1) {
            let updatedTaskList = [...taskListArr];
            updatedTaskList[itemIdx] = newTaskVal.toLowerCase();
            setTaskListArr(updatedTaskList);
          }

          arrVal.text = newTaskVal;
          arrVal.mode = "list";
          arrVal.updateErrorTxt = "";
        }
      }
      return arrVal;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (dataObj) => {
    let itemIdx = taskListArr.indexOf(dataObj.text.toLowerCase());
    if (itemIdx !== -1) {
      taskListArr.splice(itemIdx, 1);
      let updatedTaskList = [...taskListArr];
      updatedTaskList.splice(itemIdx, 1);
      setTaskListArr(updatedTaskList);
    }
    let prevItems = [...tasks];
    prevItems.map((arrVal) => {
      arrVal.mode = "list";
      arrVal.updateErrorTxt = "";
      return arrVal;
    });
    let updatedTasks = prevItems.filter((arrVal) => arrVal.id !== dataObj.id);
    setTasks(updatedTasks);
  };

  const updateInputValChanged = (dataObj) => {
    let updatedTasks = tasks.map((arrVal) => {
      if (arrVal.id === dataObj.id) {
        arrVal.updateErrorTxt = "";
      }
      return arrVal;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="todoTaskApp">
      <TodoAdd
        addTask={addTask}
        inputValChanged={inputValChanged}
        errorTxt={addErrorTxt}
      />
      {tasks.length > 0 && <TodoList tasks={tasks} upsertTask={upsertTask} />}
    </div>
  );
}
