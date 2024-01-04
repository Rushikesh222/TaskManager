import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const localStorageToken = JSON.parse(localStorage.getItem("loginDetails"));
  const [token, setToken] = useState(localStorageToken?.token);
  const [currentUser, setCurrentUser] = useState(localStorageToken?.username);
  const [currentUserId, setCurrentUserId] = useState(localStorageToken?._id);

  const signupHandler = async (email, password, username) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: `https://d720b64c-2d51-4584-ac13-936d92774432-00-2iw8z2adsbthv.sisko.replit.dev/auth/signup`,
        data: {
          email: email,
          password: password,
          username: username,
        },
      });

      if (status === 200 || status === 201) {
        console.log(data);
        localStorage.setItem(
          "loginDetails",
          JSON.stringify({
            username: data?.user?.username,
            token: data?.authToken,
            _id: data?.user?._id,
          })
        );
        setToken(data?.user?.authToken);
        setCurrentUser(data?.user?.username);
        navigate(location?.state?.from?.pathname ?? "/tasks", {
          replace: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const loginHandler = async (email, password) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: `https://d720b64c-2d51-4584-ac13-936d92774432-00-2iw8z2adsbthv.sisko.replit.dev/auth/login`,
        headers: { authorization: token },
        data: {
          email: email,
          password: password,
        },
      });

      if (status === 200 || status === 201) {
        localStorage.setItem(
          "loginDetails",
          JSON.stringify({
            username: data?.user?.username,
            token: data?.authToken,
            _id: data?.user?._id,
          })
        );
        setCurrentUser(data?.user?.username);
        setCurrentUserId(data?.user?._id);
        setToken(data?.user?.authToken);
        navigate(location?.state?.from?.pathname ?? "/tasks", {
          replace: true,
        });
      }
    } catch (error) {
      throw error;
    }
  };
  const handleUserLogout = () => {
    localStorage.removeItem("data");
    setToken(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signupHandler,
        loginHandler,
        handleUserLogout,
        token,
        currentUser,
        currentUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);
