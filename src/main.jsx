import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { TaskProvider } from "./Context/TaskContext.jsx";
import { UserProvider } from "./Context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <TaskProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </TaskProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
