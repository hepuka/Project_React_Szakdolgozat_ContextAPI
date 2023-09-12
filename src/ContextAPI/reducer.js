export const initialState = {
  user: null,
  userName: null,
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
      };

    default:
      return state;
  }
};

export default reducer;
