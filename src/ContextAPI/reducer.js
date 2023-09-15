export const initialState = {
  user: null,
  userName: null,
  userRole: null,
  userPin: null,
  currUser: "",
  users: [],
  products: [],
  orders: [],
  currUserData: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      let parts = "";

      if (action.user) {
        parts = action.user.displayName.split("|");
      }

      return {
        ...state,
        user: action.user,
        userName: parts[0],
        userRole: parts[1],
        userPin: parts[2],
      };

    case "SET_CURRUSER":
      if (action.currUserData) {
        return {
          ...state,
          currUserData: action.currUserData,
          currUser: action.currUserData.name,
        };
      }

    case "STORE_USERS":
      return {
        ...state,
        users: action.users,
      };

    case "STORE_PRODUCTS":
      return {
        ...state,
        products: action.products,
      };

    case "STORE_ORDERS":
      return {
        ...state,
        orders: action.orders,
      };

    default:
      return state;
  }
};

export default reducer;
