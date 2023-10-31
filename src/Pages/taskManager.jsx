import { useNavigate } from "react-router-dom";
import { useTaskData } from "../Context/TaskContext";
import { useAuthContext } from "../Context/AuthContext";
import { useState } from "react";

export const TaskManager = () => {
  const { taskState, taskDispatch, updateTaskData, deleteTask } = useTaskData();
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  const handleTaskDetails = (event) => {
    taskDispatch({
      type: "edit-taskDetails",
      payload: event.target.value,
    });
  };
  const handleTaskName = (event) => {
    taskDispatch({
      type: "edit-taskName",
      payload: event.target.value,
    });
  };
  const handleUpdateTask = (e) => {
    e.preventDefault();
    const findTask = taskState.taskData.find(
      ({ _id }) => _id === taskState.editData._id
    );
    updateTaskData(findTask._id, taskState.editData);
  };
  const handleTaskStatus = (event) => {
    taskDispatch({
      type: "edit-taskStatus",
      payload: event.target.checked,
    });
  };
  return (
    <div>
      <h1>Task Manager</h1>
      <div>
        <h2>Update Task</h2>
        <form onSubmit={handleUpdateTask}>
          <label>
            Task Name:
            <input
              type="text"
              name="name"
              onChange={handleTaskName}
              value={taskState.editData.TaskName}
            />
          </label>
          <label>
            Task Details
            <input
              type="text"
              name="details"
              onChange={handleTaskDetails}
              value={taskState.editData.TaskDetails}
            />
          </label>
          <div>
            <input
              type="checkbox"
              name="completed"
              checked={taskState.editData.Completed === true}
              onChange={handleTaskStatus}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
      <button onClick={() => navigate("/createtask")}>Create Task</button>
      {taskState?.taskData?.map((items) => {
        const { TaskName, TaskDetails, UserName, Completed, _id } = items;
        return (
          <div key={_id}>
            <h1>User Name:{UserName}</h1>
            <h2>Task Name:{TaskName}</h2>
            <p>
              <strong>TaskDetails</strong>:{TaskDetails}
            </p>
            <div
              className="taskStatus"
              style={{ background: Completed ? "green" : "red" }}
            >
              <h1>check</h1>
              <button onClick={() => deleteTask(_id)}>Delete</button>
              <button onClick={() => updateTaskData(_id)}>Update</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
