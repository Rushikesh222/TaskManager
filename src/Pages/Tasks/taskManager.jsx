import { useNavigate } from "react-router-dom";
import { useTaskData } from "../../Context/TaskContext";
import { useAuthContext } from "../../Context/AuthContext";
import "./TaskManager.css";
import { useState } from "react";
import { Headers } from "../../components/Header";
export const TaskManager = () => {
  const { taskState, taskDispatch, updateTaskData, deleteTask } = useTaskData();
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const [updateMode, setUpdateMode] = useState(false);

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
    <div className="task-manager-container">
      <Headers />
      <div
        className="update-container"
        style={{ display: updateMode ? "flex" : "none" }}
      >
        <h2>Update Task</h2>
        <form className="update-task-container" onSubmit={handleUpdateTask}>
          <label>
            Task Name
            <input
              type="text"
              className="input-update"
              onChange={handleTaskName}
              value={taskState.editData.TaskName}
            />
          </label>
          <label>
            Task Details
            <input
              type="text"
              className="input-update"
              onChange={handleTaskDetails}
              value={taskState.editData.TaskDetails}
            />
          </label>
          <label>
            Update Status
            <input
              type="checkbox"
              className="input-update-checkbox"
              checked={taskState.editData.Completed === true}
              onChange={handleTaskStatus}
            />
          </label>

          <button className="update-btn" type="submit">
            Update
          </button>
        </form>
      </div>
      <button
        className="create-task-btn"
        onClick={() => navigate("/createtask")}
      >
        Create Task
      </button>
      {taskState?.taskData?.map((items) => {
        const { TaskName, TaskDetails, UserName, Completed, _id } = items;
        console.log(UserName);
        return (
          <div className="Task-details-block" key={_id}>
            <div className="profile-pic-container">
              <img
                className="profile-pic"
                src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
              />
              <h3>@{UserName}</h3>
            </div>
            <div className="task-details-info">
              <p>
                <strong>Task Name:</strong>
                {TaskName}
              </p>
              <p>
                <strong>TaskDetails</strong>:{TaskDetails}
              </p>

              <h1
                className="task-status"
                style={{ color: Completed ? "green" : "red" }}
              >
                {Completed ? "Completed" : "Remains"}
              </h1>

              <div
                style={{
                  display: currentUser === "Rush" || UserName===currentUser? "flex" : "none",
                }}
                className="task-manager-btn"
              >
                <button className="delete-task" onClick={() => deleteTask(_id)}>
                  Delete
                </button>
                <button
                  className="edit-task"
                  onClick={() => {
                    setUpdateMode(!updateMode);
                    updateTaskData(_id);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
