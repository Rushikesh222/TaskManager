import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import { NavLink } from "react-router-dom";
import "./Header.css";

export const Headers = () => {
  const { handleUserLogout, currentUser } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="header-container">
      <h1 className="task-name">TASK MANAGER</h1>
      <div className="user-detials-block">
        <div className="profile-pic-container-header">
          <NavLink
            style={{ display: currentUser === "Rushikesh" ? "flex" : "none" }}
            to="/users"
          >
            <nav>Users</nav>
          </NavLink>
          <NavLink to="/tasks">
            <nav>Tasks</nav>
          </NavLink>
          <img
            className="profile-pic"
            src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
          />
          <h3>@ {currentUser}</h3>
          <button
            className="logout-btn"
            onClick={() => {
              handleUserLogout();
              navigate(`/`);
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
