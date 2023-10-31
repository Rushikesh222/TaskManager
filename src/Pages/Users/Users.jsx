import { useUsers } from "../../Context/UserContext";
import { Headers } from "../../components/Header";
import "./User.css";
export const Users = () => {
  const { userState, deleteUser } = useUsers();
  return (
    <div className="user-containers">
      <Headers />
      <div className="user-block">
        {" "}
        <h1>All users</h1>
        {userState?.userData?.map((list) => {
          const { username, email, _id } = list;
          return (
            <div className="user-details" key={_id}>
              <div className="profile-pic-container">
                <img
                  className="profile-pic"
                  src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                />
                <h3>@{username}</h3>
              </div>
              <div className="user-info">
                <p>
                  <strong>User Email:</strong>
                  {email}
                </p>
                <div className="user-btn-block">
                  <button
                    className="delete-user-btn"
                    onClick={() => {
                      deleteUser(_id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
