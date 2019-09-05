const initState = {
  user: null
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "SIGNUP_USER":
      console.log("signup user", action.user);
      return {
        ...state
      };
    case "SIGNIN_USER":
      console.log("signIN user", action.user);
      return {
        ...state
      };
    case "AUTH_ERR":
        window.M.toast({ html: action.error });
      return {
        ...state
      };
    default:
      return state;
  }
};

export default authReducer;
