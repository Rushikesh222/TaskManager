import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { NavLink } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginHandler, token } = useAuthContext();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginAccout = (event) => {
    event.preventDefault();
    loginHandler(email, password);
    console.log(email, password);
    console.log(token);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginAccout}>
        <label>
          Enter Email
          <input type="text" onChange={handleEmail} />
        </label>
        <label>
          Enter Password
          <input type="text" onChange={handlePassword} />
        </label>

        <button type="submit">Login</button>
      </form>
      <NavLink to="/signup">
        <p>Signup</p>
      </NavLink>
    </div>
  );
};
