import axios from "axios";
import { useReducer } from "react";
import { createContext, useContext, useEffect } from "react";
import { taskReducer } from "../Reducer/TaskReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
export const TaskContext = createContext();
export const TaskProvider = ({ children }) => {
  const { currentUser } = useAuthContext();
  const initialState = {
    isTaskLoading: false,
    taskData: [],
    editData: {
      _id: "",
      TaskName: "",
      TaskDetails: "",
      UserName: currentUser,
    },
  };
  const location = useLocation();
  const navigate = useNavigate();
  const [taskState, taskDispatch] = useReducer(taskReducer, initialState);

  const getData = async () => {
    try {
      taskDispatch({ type: "task-loading", payload: true });
      const { data, status } = await axios({
        method: "GET",
        url: "https://taskmanager.rushikeshshirsa.repl.co/task",
      });
      if (status === 200 || status === 201) {
        taskDispatch({ type: "get_task", payload: data });
        taskDispatch({ type: "task-loading", payload: false });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const createTaskData = async (taskname, taskdetails, username, completed) => {
    try {
      taskDispatch({ type: "task-loading", payload: true });
      const { data, status } = await axios({
        method: "POST",
        url: "https://taskmanager.rushikeshshirsa.repl.co/task",
        data: {
          TaskName: taskname,
          TaskDetails: taskdetails,
          UserName: username,
          Completed: completed,
        },
      });

      if (status === 200 || status === 201) {
        taskDispatch({ type: "get_task", payload: data?.Task });
        taskDispatch({ type: "task-loading", payload: false });
        navigate(location?.state?.from?.pathname ?? "/tasks", {
          replace: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const updateTaskData = async (_id, editData) => {
    try {
      taskDispatch({ type: "task-loading", payload: true });

      const { data, status } = await axios({
        method: "POST",
        url: `https://taskmanager.rushikeshshirsa.repl.co/task/user/edit/${_id}`,
        data: editData,
      });
      if (status === 200 || status === 201) {
        console.log(data);
        taskDispatch({ type: "get_editData", payload: data?.saved });
        taskDispatch({ type: "get_task", payload: data?.Task });
        taskDispatch({ type: "task-loading", payload: false });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteTask = async (_id) => {
    try {
      taskDispatch({ type: "task-loading", payload: true });

      const { data, status } = await axios({
        method: "DELETE",
        url: `https://taskmanager.rushikeshshirsa.repl.co/task/user/${_id}`,
      });
      if (status === 200 || status === 201) {
        console.log(data);
        taskDispatch({ type: "get_task", payload: data?.Task });
        taskDispatch({ type: "task-loading", payload: false });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <TaskContext.Provider
      value={{
        taskState,
        taskDispatch,
        createTaskData,
        updateTaskData,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
export const useTaskData = () => useContext(TaskContext);
