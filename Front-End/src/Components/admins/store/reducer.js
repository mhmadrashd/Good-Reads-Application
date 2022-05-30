import { initialState } from "./context";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "Login":
      sessionStorage.setItem(
        "currentUserInfo",
        JSON.stringify(action.payload.user)
      );

      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case "Logout":
      sessionStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};
export default reducer;
