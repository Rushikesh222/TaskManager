import axios from "axios";

const loginService = async (email, password) =>
  await axios.post("https://taskmanager.rushikeshshirsa.repl.co/login", {
    email: email,
    password: password,
  });
// const signupService = async (email, password) =>
//   await axios.post("https://taskmanager.rushikeshshirsa.repl.co/signup", {
//     email: email,
//     password: password,
//     username: username,
//   });
export { loginService };
