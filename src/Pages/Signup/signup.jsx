import { useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import { NavLink } from "react-router-dom";
import "./signup.css";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const { signupHandler } = useAuthContext();
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };
  const handleCreateAccount = (event) => {
    event.preventDefault();
    signupHandler(email, password, userName);
  };
  return (
    <div className="signup-container">
      <h1 className="task-name">TASK</h1>
      <h1 className="task-name">MANAGER</h1>
      <div className="signup-block">
        <h1 className="signup-title">Create Account</h1>
        <form className="signup-form" onSubmit={handleCreateAccount}>
          <label>
            Enter Email
            <input
              type="text"
              className="input-signup"
              onChange={handleEmail}
              placeholder="Enter Email"
            />
          </label>
          <label>
            Enter Password
            <input
              type="password"
              className="input-signup"
              onChange={handlePassword}
              placeholder="Enter Password"
            />
          </label>
          <label>
            Enter User Name
            <input
              type="text"
              className="input-signup"
              onChange={handleUserName}
              placeholder="Enter Username"
            />
          </label>
          <button className="signup-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
