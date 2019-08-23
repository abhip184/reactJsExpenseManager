import React, { Component } from 'react'
import { createAccount } from '../../store/actions/accountActions';
import { connect } from 'react-redux';

class CreateAccount extends Component {
    state = {
        name:'',
        initAmount:'',
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit = (e) =>
    {
        e.preventDefault();
        this.props.createAccount(this.state)
        // console.log(this.state)
    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5>Create Account</h5>
                    <div className="input-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="initAmount">Initial Amount</label>
                        <input type="number" id="initAmount" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="pink btn">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        createAccount:(account) => dispatch(createAccount(account))
    }
}

export default connect(null,mapDispatchToProps)(CreateAccount)
