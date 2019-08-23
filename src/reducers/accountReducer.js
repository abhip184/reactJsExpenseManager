const initState= {
    accounts:[
        {id:'1', name:'Wallet', initAmount:5000},
        {id:'2', name:'Travel', initAmount:5000},
        {id:'3', name:'Party', initAmount:5000}
    ]
}
const accountReducer = (state = initState, action) => {
    switch(action.type)
    {
       case 'CREATE_ACCOUNT': 
       console.log('create Project', action.account)
    }
    return state
}

export default accountReducer