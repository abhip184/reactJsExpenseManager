import React, { Component } from 'react'
import AccountList from '../account/AccountList'
import { connect } from 'react-redux';
 
class Dashboard extends Component {
    render() {
        const {accounts} = this.props
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="s12 m12">
                       <AccountList accounts={accounts}/> 
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        accounts: state.account.accounts,
}
}


export default connect(mapStateToProps)(Dashboard)
