import { useTaskData } from "../Context/TaskContext";

export const Users = () => {
  const { taskState, deleteUser } = useTaskData();
  return (
    <div>
      <h1>All users</h1>

      {taskState?.userData?.map((list) => {
        const { username, email, _id } = list;
        return (
          <div key={_id}>
            <p>
              <strong>User Name</strong>
              {username}
            </p>
            <p>
              <strong>User Email</strong>
              {email}
            </p>
            <button
              onClick={() => {
                deleteUser(_id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};
