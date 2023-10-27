import axios from "axios";
import { useReducer } from "react";
import { createContext, useContext, useEffect } from "react";
import { taskReducer } from "../Reducer/TaskReducer";
export const TaskContext = createContext();
export const TaskProvider = ({ children }) => {
  const initialState = {
    isTaskLoading: false,
    taskData: [],
    userData: [],
  };
  const [taskState, taskDispatch] = useReducer(taskReducer, initialState);
  const getUsers = async () => {
    try {
      const { data, status } = await axios({
        method: "GET",
        url: "https://taskmanager.rushikeshshirsa.repl.co/users",
      });
      if (status === 200 || status === 201) {
        console.log(data);
        taskDispatch({ type: "get_users", payload: data });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getData = async () => {
    try {
      const { data, status } = await axios({
        method: "GET",
        url: "https://taskmanager.rushikeshshirsa.repl.co/task",
      });
      if (status === 200 || status === 201) {
        console.log(data);
        taskDispatch({ type: "get_task", payload: data });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const createTaskData = async (taskname, taskdetails, completed, username) => {
    try {
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
        console.log(data);
        // taskDispatch({ type: "get_task", payload: data });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const updateTaskData = async (_id, taskname, taskdetails, completed) => {
    try {
      const { data, status } = await axios({
        method: "GET",
        url: "https://taskmanager.rushikeshshirsa.repl.co/task",
        data: {
          TaskName: taskname,
          TaskDetails: taskdetails,
          UserName: username,
          Completed: completed,
        },
      });
      if (status === 200 || status === 201) {
        console.log(data);
        // taskDispatch({ type: "get_task", payload: data });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteTask = async (_id) => {
    try {
      const { data, status } = await axios({
        method: "GET",
        url: `https://taskmanager.rushikeshshirsa.repl.co/task/${_id}`,
      });
      if (status === 200 || status === 201) {
        console.log(data);
        // taskDispatch({ type: "get_task", payload: data });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteUser = async (_id) => {
    try {
      const { data, status } = await axios({
        method: "DELETE",
        url: `https://taskmanager.rushikeshshirsa.repl.co/user/${_id}`,
      });
      if (status === 200 || status === 201) {
        console.log(data);
        // taskDispatch({ type: "get_task", payload: data });
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
    getUsers();
  }, []);
  return (
    <TaskContext.Provider
      value={{
        taskState,
        taskDispatch,
        createTaskData,
        updateTaskData,
        deleteTask,
        deleteUser,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
export const useTaskData = () => useContext(TaskContext);
