const initState = {
  accounts: ""
};
const accountReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_ACCOUNT":
      let accounts = [...state.accounts, action.newAccount];
      return {
        ...state,
        accounts: accounts
      };
    case "GET_ACCOUNTS":
      console.log("get accounts", action.allAccounts);
      let allAccounts = action.allAccounts;
      return {
        ...state,
        accounts: allAccounts
      };
    case "DELETE_ACCOUNT":
      console.log("get accounts", action.id);
      let afterDelete = state.accounts.filter(account => {
        return action.id !== account._id;
      });
      return {
        ...state,
        accounts: afterDelete
      };
    case "EDIT_ACCOUNT":
      console.log("new account inf", action.updateOps);
      console.log("old account inf", state.accounts);
      const updatedAccounts = state.accounts.map(account => {
        if (account._id !== action.updateOps._id) {
          return account;
        }
        return {
          ...state,
          ...account,
          ...action.updateOps
        };
      });

      return {
        ...state,
        accounts: updatedAccounts
      };
    default:
      return state;
  }
};

export default accountReducer;
