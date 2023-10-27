import { createContext, useContext, useEffect, useState } from "react";
import { loginService } from "../service/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Signup } from "../Pages/signup";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const localStorageToken = JSON.parse(localStorage.getItem("loginDetials"));
  const [token, setToken] = useState(localStorageToken?.token);
  const [currentUser, setCurrentUser] = useState(localStorageToken?.username);
  const [currentUserId, setCurrentUserId] = useState(localStorageToken?._id);

  const signupHandler = async (email, password, username) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: `https://taskmanager.rushikeshshirsa.repl.co/signup`,
        data: {
          email: email,
          password: password,
          username: username,
        },
      });

      if (status === 200 || status === 201) {
        localStorage.setItem(
          "loginDetails",
          JSON.stringify({
            username: data?.data?.username,
            token: data?.data?.token,
            _id: data?.data?._id,
          })
        );
        setToken(data?.data?.token);
        setCurrentUser(data?.data?.username);
        setCurrentUserId(data?.data?._id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const loginHandler = async (email, password) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: `https://taskmanager.rushikeshshirsa.repl.co/login`,
        headers: { authorization: token },
        data: {
          email: email,
          password: password,
        },
      });

      if (status === 200 || status === 201) {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(currentUserId, token, currentUser);
  useEffect(() => {}, [token, currentUser]);

  return (
    <AuthContext.Provider
      value={{
        signupHandler,
        loginHandler,
        token,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);
