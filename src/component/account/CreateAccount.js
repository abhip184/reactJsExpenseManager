import React, { Component } from "react";
import { createAccount } from "../../store/actions/accountActions";
import { connect } from "react-redux";

class CreateAccount extends Component {
  state = {
    accountName: "",
    currentBalance: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createAccount(this.state);
    // this.props.history.push('/')
  };
  render() {
    return (
      <div className="container">
        <br></br>
        <div className="row">
          <div className="card-panel col s12 m6 offset-m3">
            <form onSubmit={this.handleSubmit} className="white">
              <h5>Create Account</h5>
              <div className="input-field">
                <label htmlFor="accountName">Name</label>
                <input
                  type="text"
                  id="accountName"
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field">
                <label htmlFor="currentBalance">Initial Amount</label>
                <input
                  type="number"
                  id="currentBalance"
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field">
                <button className="pink btn">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.account);
  return {
    createSuccess: state.account.createSuccess
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createAccount: account => dispatch(createAccount(account))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccount);
