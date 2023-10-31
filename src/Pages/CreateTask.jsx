import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { useTaskData } from "../Context/TaskContext";
import { NavLink } from "react-router-dom";

export const CreateTask = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [taskStatus, setTaskStatus] = useState(true);

  const { currentUser, token } = useAuthContext();
  const { createTaskData } = useTaskData();

  const handleTaskName = (event) => {
    setTaskName(event.target.value);
  };
  const handleTaskDetails = (event) => {
    setTaskDetails(event.target.value);
  };
  const handleTaskStatus = (status) => {
    setTaskStatus(status);
  };

  const handleCreateTask = (event) => {
    event.preventDefault();
    createTaskData(taskName, taskDetails, currentUser, taskStatus);
  };

  return (
    <div>
      <h1>Create Task</h1>
      <form onSubmit={handleCreateTask}>
        <label>
          Task Name:
          <input type="text" onChange={handleTaskName} />
        </label>
        <label>
          Task Details
          <input type="text" onChange={handleTaskDetails} />
        </label>
        <div>
          <label></label>
          <input
            type="radio"
            name="status"
            checked={taskStatus === true}
            onChange={() => handleTaskStatus(true)}
          />
          <label>True</label>
          <input
            type="radio"
            name="status"
            checked={taskStatus === false}
            onChange={() => handleTaskStatus(false)}
          />
          <label>False</label>
        </div>
        <button type="submit">Create Task</button>
      </form>
      <NavLink to="/signup">
        <p>Signup</p>
      </NavLink>
    </div>
  );
};
