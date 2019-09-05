import React, { Component } from "react";
import { connect } from "react-redux";
import { signUpUser } from "../../store/actions/authActions";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signUpUser(this.state);
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card-panel col s12 m6 offset-m3">
            <form onSubmit={this.handleSubmit} className="white">
              <h5 className="center indigo-text">Sign Up</h5>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="validate"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="validate"
                  minLength="8"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="firstName">FirstName</label>
                <input
                  type="text"
                  id="firstName"
                  className="validate"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="lastName">LastName</label>
                <input
                  type="text"
                  id="lastName"
                  className="validate"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="input-field center">
                <button className="pink btn">SignUp</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    signUpUser: user => dispatch(signUpUser(user))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
