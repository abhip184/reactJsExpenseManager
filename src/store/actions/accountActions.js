import axios from "axios";
import history from "../../history";
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `bearer ${token}`;

export const createAccount = account => {
  return (dispatch) => {
    //make async db call
    axios
      .post("http://localhost:8080/accounts", account)
      .then(result => {
        const newAccount = result.data.createdAcccount;
        dispatch({ type: "CREATE_ACCOUNT", newAccount });
        window.M.toast({
          html: "Account Created",
          displayLength: 1000,
          completeCallback: function() {
            history.push("/dashboard");
          }
        });
      })
      .catch(err => {
        const error = err.response.data.message;
        console.log("err from createAccount",err,error)
        window.M.toast({ html: error });
      });
  };
};

export const getAccounts = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:8080/accounts")
      .then(result => {
        const allAccounts = result.data.data;
        dispatch({ type: "GET_ACCOUNTS", allAccounts });
      })
      .catch(err => {
        const error = err.response.data.message;
        console.log("err from getAccounts",err,error)
        window.M.toast({ html: error });
      });
  };
};
export const deleteAccount = id => {
  return (dispatch) => {
    axios
      .delete("http://localhost:8080/accounts/" + id)
      .then(result => {
        window.M.toast({ html: result.data.message, displayLength: 1000 });
        dispatch({ type: "DELETE_ACCOUNT", id });
      })
      .catch(err => {
        const error = err.response.data.message;
        console.log("err from deleteAccount",err,error)
        window.M.toast({ html: error });
      });
  };
};
export const editAccount = (id, newAccountName) => {
  return (dispatch) => {
    axios
      .patch("http://localhost:8080/accounts/" + id, [
        { propName: "accountName", value: newAccountName }
      ])
      .then(result => {
        window.M.toast({ html: result.data.message, displayLength: 1000 });
        const updateOps = { _id: id, accountName: newAccountName };
        dispatch({ type: "EDIT_ACCOUNT", updateOps });
      })
      .catch(err => {
        const error = err.response.data.message;
        console.log("err from editAccount",err,error)
        window.M.toast({ html: error });
      });
  };
};
