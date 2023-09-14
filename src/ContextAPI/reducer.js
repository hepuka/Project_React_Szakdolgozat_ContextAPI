export const initialState = {
  user: null,
  userName: null,
  isActive: false,
  users: [],
  products: [],
  orders: [],
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
