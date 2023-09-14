export const initialState = {
  user: null,
  userName: null,
  currUser: null,
  users: [],
  products: [],
  orders: [],
  currUserData: [],
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

    case "SET_CURRUSER":
      let currData = "";

      if (action.currUserData) {
        currData = action.currUserData.find(
          (item) => item.email === action.user.email
        );
      }

      return {
        ...state,
        currUserData: action.currUserData,
        currUser: currData,
      };

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
