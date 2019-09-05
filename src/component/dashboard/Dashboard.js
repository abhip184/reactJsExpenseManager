import React, { Component } from "react";
import AccountList from "../account/AccountList";
import {
  getAccounts,
  deleteAccount,
  editAccount
} from "../../store/actions/accountActions";
import { connect } from "react-redux";
import Swal from "sweetalert2";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAccounts();
  }
  handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        this.props.deleteAccount(id);
      }
    });
  };

  handleEdit = async (id, accountName) => {
    console.log(id, accountName);
    const { value: newName } = await Swal.fire({
      title: "Enter New Name",
      input: "text",
      inputValue: accountName,
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return "You need to write something!";
        }
        if (value === accountName) {
          return "account name unchanged";
        }
      }
    });

    if (newName) {
      this.props.editAccount(id, newName);
    }
  };
  render() {
    const { accounts } = this.props;
    const userName = localStorage.getItem("firstName");

    const accountList = accounts.length ? (
      <div className="s12 m12">
        <h5>Accounts of {userName}</h5>
        <hr></hr>
        <AccountList
          accounts={accounts}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
        />
      </div>
    ) : (
      <div className="col s12 m12">
        <div className="card-panel indigo lighten-4 center-align">
          <span className="indigo-text ">
            <i className="material-icons large center-align">
              sentiment_dissatisfied
            </i>
            <br></br>
            You have no accounts please create one
          </span>
        </div>
      </div>
    );
    return (
      <div className="dashboard container">
        <div className="row">{accountList} </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    accounts: state.account.accounts
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAccounts: () => dispatch(getAccounts()),
    deleteAccount: id => dispatch(deleteAccount(id)),
    editAccount: (id, newAccountName) =>
      dispatch(editAccount(id, newAccountName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
