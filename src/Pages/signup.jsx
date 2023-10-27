import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { NavLink } from "react-router-dom";

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
    console.log(email, password, userName);
  };
  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleCreateAccount}>
        <label>
          Enter Email
          <input type="text" onChange={handleEmail} />
        </label>
        <label>
          Enter Password
          <input type="text" onChange={handlePassword} />
        </label>
        <label>
          Enter User Name
          <input type="text" onChange={handleUserName} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <NavLink to="/">
        <h1>Login</h1>
      </NavLink>
    </div>
  );
};
