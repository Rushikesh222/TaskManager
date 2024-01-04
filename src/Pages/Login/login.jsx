import { useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import { NavLink } from "react-router-dom";
import "./login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const adminUserLoginDetails = {
  //   username: "Rushikesh@gmail.com",
  //   password: "Rushikesh@123",
  // };
  const { loginHandler } = useAuthContext();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginAccout = (event) => {
    event.preventDefault();
    loginHandler(email, password);
  };

  return (
    <div className="login-container">
      <h1 className="task-name">TASK</h1>
      <h1 className="task-name">MANAGER</h1>
      <div className="login-block">
        <h1 className="login-title">Login</h1>
        <form className="login-from" onSubmit={handleLoginAccout}>
          <label>
            Email
            <input
              className="input-login"
              placeholder="Enter Email"
              type="text"
              onChange={handleEmail}
            />
          </label>
          <label>
            Password
            <input
              type="text"
              className="input-login"
              onChange={handlePassword}
              placeholder="Enter Password"
            />
          </label>

          <button className="login-btn" type="submit">
            Login
          </button>
          <button
            className="admin-btn"
            onClick={(event) => {
              event.preventDefault();
              loginHandler("rushikesh@gmail.com", "Rush123");
            }}
          >
            Admin Login
          </button>
        </form>

        <h3 className="signup-link">
          Create an Account
          <NavLink to="/signup">
            <p>Signup</p>
          </NavLink>
        </h3>
      </div>
    </div>
  );
};
