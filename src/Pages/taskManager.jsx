import { useNavigate } from "react-router-dom";
import { useTaskData } from "../Context/TaskContext";

export const TaskManager = () => {
  const { taskState } = useTaskData();
  const navigate = useNavigate();
  console.log(taskState);
  return (
    <div>
      <h1>Task Manager</h1>
      <button onClick={() => navigate("/createtask")}>Create Task</button>
      {taskState?.taskData?.map((items) => {
        const { TaskName, TaskDetails, UserName, Completed } = items;
        return (
          <div>
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
            </div>
          </div>
        );
      })}
    </div>
  );
};
