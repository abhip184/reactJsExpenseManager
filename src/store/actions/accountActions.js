export const createAccount = (account) => {
    return (dispatch,getState) => {
        //make async db call
        dispatch({ type:'CREATE_ACCOUNT',account})
    }
       
}