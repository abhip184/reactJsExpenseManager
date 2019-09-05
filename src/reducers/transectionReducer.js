const initState = {
  transections: "",
  balance: "",
  account: ""
};
const transectionReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_TRANSECTIONS":
      return {
        ...state,
        transections: action.transections,
        account: action.account
      };
  
    case "CREATE_TRANSECTION":

      let transections = []
        .concat(...state.transections, action.newTransection)
        .sort(function(a, b) {
          return new Date(b.atDate) - new Date(a.atDate);
        });

      return {
        ...state,
        transections: transections
      };
   
    case "GET_BALANCE":
      return {
        ...state,
        balance: action.balance
      };
    case "DELETE_TRANSECTION":
      let afterDelete = state.transections.filter(transection => {
        return action.id !== transection._id;
      });
      return {
        ...state,
        transections: afterDelete
      };
    case "EDIT_TRANSECTION":
      const updatedTransection = state.transections.map(transection => {
        if (transection._id !== action.updateOps._id) {
          return transection;
        }
        return {
          ...state,
          ...transection,
          ...action.updateOps
        };
      });
      return {
        ...state,
        transections: updatedTransection
      };
    case "ADD_FRIEND":
      var updated = {
        ...state,
        ...state.account,
        invites: state.account.invites.concat(action.friendEmail)
      };
      return {
        ...state,
        account: updated
      };

    default:
      return { ...state };
  }
};
export default transectionReducer;
