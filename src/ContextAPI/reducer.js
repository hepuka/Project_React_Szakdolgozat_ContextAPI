export const initialState = {
  user: null,
  userName: null,
  userRole: null,
  userPin: null,
  users: [],
  product: [],
  products: [],
  orders: [],
  tempProducts: [],
  currUserData: null,
  category: null,
  selectedproduct: "",
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

    case "SET_CATEGORY":
      if (action.category === "Összes") {
        state.tempProducts = action.product;
      } else {
        state.tempProducts = state.product.filter(
          (product) => product.category === action.category
        );
      }

      return {
        ...state,
        product: action.product,
        category: action.category,
      };

    case "SET_SELECTEDPRODUCT":
      if (action.selectedproduct) {
        return {
          ...state,
          selectedproduct: action.selectedproduct,
        };
      }

    default:
      return state;
  }
};

export default reducer;
