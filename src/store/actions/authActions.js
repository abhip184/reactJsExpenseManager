import axios from "axios";
function setlocalStorage(user) {
  localStorage.setItem("token", user.token);
  localStorage.setItem(
    "userInitials",
    user.firstName.charAt(0) + user.lastName.charAt(0)
  );
  localStorage.setItem("userStatus", "in");
  localStorage.setItem("firstName", user.firstName);
  localStorage.setItem("lastName", user.lastName);
}
export const signUpUser = user => {
  return (dispatch) => {
    axios
      .post("http://localhost:8080/users/signup", user)
      .then(result => {
        const user = result.data.userData;
        setlocalStorage(user);
        //dispatching action
        dispatch({ type: "SIGNUP_USER", user });
        //redirecting with referesh browser
        window.location = "/create";
      })
      .catch(err => {
        const error = err.response.data.message;
        console.log("err from signiUpUser",err,error)
        window.M.toast({ html: error });
      });
  };
};
export const singInUser = user => {
  return (dispatch) => {
    axios
      .post("http://localhost:8080/users/login", user)
      .then(result => {
        const user = result.data.userData;
        setlocalStorage(user);
        dispatch({ type: "SIGNIN_USER", user });
        //redirecting with referesh browser
        window.location = "/dashboard";
      })
      .catch(err => {
        const error = err.response.data.message;
        console.log("err from singInUser",err,error)
        window.M.toast({ html: error });
      });
  };
};
