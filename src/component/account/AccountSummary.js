import React from 'react'

const AccountSummary = ({account}) => {
    return (
    <div className="card">
        <div className="card-content indigo-text">
            <span className="card-title">{account.name}</span>
            <p>owner is this<br></br>shared with this</p>    
        </div>
    </div>
    )
}

export default AccountSummary
