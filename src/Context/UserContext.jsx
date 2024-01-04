import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userReducer } from "../Reducer/UserReducer";
import axios from "axios";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const initialState = {
    isUserLoading: false,
    taskData: [],
  };

  const location = useLocation();
  const navigate = useNavigate();
  const [userState, userDispatch] = useReducer(userReducer, initialState);
  const getUsers = async () => {
    try {
      userDispatch({ type: "user-loading", payload: true });
      const { data, status } = await axios({
        method: "GET",
        url: "https://d720b64c-2d51-4584-ac13-936d92774432-00-2iw8z2adsbthv.sisko.replit.dev/users",
      });
      if (status === 200 || status === 201) {
        console.log(data);
        userDispatch({ type: "get_users", payload: data });
        userDispatch({ type: "user-loading", payload: false });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteUser = async (_id) => {
    try {
      userDispatch({ type: "user-loading", payload: true });
      const { data, status } = await axios({
        method: "DELETE",
        url: `https://d720b64c-2d51-4584-ac13-936d92774432-00-2iw8z2adsbthv.sisko.replit.dev/user/${_id}`,
      });
      if (status === 200 || status === 201) {
        console.log(data);
        userDispatch({ type: "get_users", payload: data });
        userDispatch({ type: "user-loading", payload: false });
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <UserContext.Provider value={{ userState, userDispatch, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUsers = () => useContext(UserContext);
