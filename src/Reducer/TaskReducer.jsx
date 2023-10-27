export const taskReducer = (state, action) => {
  switch (action.type) {
    case "task-loading":
      return { ...state, isTaskLoading: action.payload };

    case "get_task":
      return { ...state, taskData: action.payload };
    case "get_users":
      return { ...state, userData: action.payload };

    default:
      break;
  }
};
