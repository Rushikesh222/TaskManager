export const taskReducer = (state, action) => {
  switch (action.type) {
    case "task-loading":
      return { ...state, isTaskLoading: action.payload };

    case "get_task":
      return { ...state, taskData: action.payload };
    case "get_editData":
      return {
        ...state,
        editData: {
          _id: action.payload._id,
          TaskName: action.payload.TaskName,
          TaskDetails: action.payload.TaskDetails,
          UserName: action.payload.UserName,
          Completed: action.payload.Completed,
        },
      };
    case "edit-taskName":
      return {
        ...state,
        editData: { ...state.editData, TaskName: action.payload },
      };
    case "edit-taskDetails":
      return {
        ...state,
        editData: { ...state.editData, TaskDetails: action.payload },
      };
    case "edit-taskStatus":
      return {
        ...state,
        editData: { ...state.editData, Completed: action.payload },
      };
    default:
      break;
  }
};
