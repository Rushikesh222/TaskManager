export const userReducer = (state, action) => {
  switch (action.type) {
    case "user-loading":
      return { ...state, isUserLoading: action.payload };
    case "get_users":
      return { ...state, userData: action.payload };

    default:
      break;
  }
};
