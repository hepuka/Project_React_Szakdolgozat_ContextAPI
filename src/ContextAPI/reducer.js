export const initialState = {
  user: null,
  userName: null,
  isActive: false,
  users: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      let uName = "";

      if (action.user) {
        const userEmail = action.user.email.substring(
          0,
          action.user.email.indexOf("@")
        );
        uName = userEmail.charAt(0).toUpperCase() + userEmail.slice(1);
      }

      return {
        ...state,
        user: action.user,
        userName: uName,
        isActive: true,
      };

    case "STORE_USERS":
      return {
        ...state,
        users: action.users,
      };

    default:
      return state;
  }
};

export default reducer;
