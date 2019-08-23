import React from 'react'
import AccountSummary from './AccountSummary';
const AccountList = ({accounts}) => {
    return (
        <div className="account-list section">
           {accounts && accounts.map(account =>{
               return(
                   <AccountSummary account={account} key={account.id}/>
               )
           }) }
        </div>
    )
}

export default AccountList
