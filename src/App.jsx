import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Signup } from "./Pages/Signup/signup";
import { Login } from "./Pages/Login/login";
import { TaskManager } from "./Pages/Tasks/taskManager";
import { CreateTask } from "./Pages/CreateTask/CreateTask";
import { Users } from "./Pages/Users/Users";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/createtask" element={<CreateTask />} />
          <Route path="/tasks" element={<TaskManager />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
