import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Signup } from "./Pages/signup";
import { Login } from "./Pages/login";
import { TaskManager } from "./Pages/taskManager";
import { CreateTask } from "./Pages/CreateTask";
import { Users } from "./Pages/Users";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/createtask" element={<CreateTask />} />
          <Route path="/" element={<TaskManager />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
