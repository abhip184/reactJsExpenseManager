import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import TransectionSummary from "./TransectionSummary.js";
import {
  getTransections,
  addTransections,
  deleteTransection,
  editTransection,
  addFriend
} from "../../store/actions/transectionAction.js";

var accountId;

class TransectionList extends Component {
  async componentDidMount() {
    accountId = this.props.match.params.id;
    console.log(this.props.match.params.id);
    this.props.getTransections(accountId);
  }

  handleAdd = () => {
    this.props.addTransections(accountId);
  };

  handleDelete = (transectionId, accId = accountId) => {
    this.props.deleteTransection(transectionId, accId);
  };

  handleEdit = async (transectionId, oldCategory, oldAmount, accId = accountId) => {
    const { value: formValues } = await Swal.fire({
      title: "Multiple inputs",
      html: `<input id="swal-input1" class="swal2-input" value=${oldAmount}>
              <input id="swal-input2" class="swal2-input" value=${oldCategory}>`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value
        ];
      }
    });

    if (formValues) {
      this.props.editTransection(transectionId, formValues[1], formValues[0],accId);
    }
  };

  handleFriend = async () => {
    const { value: email } = await Swal.fire({
      title: "Enter Friend's email address",
      input: "email",
      inputPlaceholder: "Ex.. abc123@xyz.com"
    });

    if (email) {
      this.props.addFriend(email, accountId);
    }
  };

  render() {
    const { transections, balance } = this.props;
    const account = this.props.account;
    const transectionList = transections.length ? (
      transections &&
      transections.map(transection => {
        return (
          <TransectionSummary
            transection={transection}
            key={transection._id}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
          />
        );
      })
    ) : (
      <div className="col s12 m12">
        <div className="card-panel indigo lighten-4 center-align">
          <span className="indigo-text ">
          <div class="timer-loader">Loading…</div>
            <br></br>
            You have no transections
          </span>
        </div>
      </div>
    );
    
    const ownerInfo = account.owner ? (
      <div className="card-panel hoverable">
        <sub className="">Owner Information</sub>
        <br></br>
        <blockquote>
          {account.owner.firstName} {account.owner.lastName} <br></br>
          {account.owner.email}
        </blockquote>
        <br></br>
      </div>
    ) : (
      <p>fatching</p>
    );

    const sharingInfo = account.invites ? (
      account.invites.map(invite => {
        return (
          <span>
            {invite}
            <br></br>
          </span>
        );
      })
    ) : (
      <p>fatching</p>
    );

    const inviteCount = account.invites ? (
      account.invites.length <= 0 ? (
        <p>Not shared</p>
      ) : (
        <span>Shared with {account.invites.length} Friends</span>
      )
    ) : (
      <p>fatching</p>
    );

    return (
      <div className="dashboard">
        <div className="row">
          <div className="col s12 m8">
            <div className="card-panel indigo">
              <span className="white-text flow-text" id="balanceHolder">
                Current Balance{" "}
                <span className="right">{balance || "0"}rs.</span>
              </span>
              <br></br>
            </div>
            <ul className="collection" id="transectionHolder">
              {transectionList}
            </ul>
          </div>
          <div className="col m4 s12" id="stick">
            <div className="card-panel indigo hoverable">
              <sub className="white-text">Current Account</sub>
              <br></br>
              <span className="white-text flow-text" id="balanceHolder">
                {account.accountName}
              </span>
              <br></br>
            </div>
            <div className="card-panel hoverable">
              <sub className="">Actions</sub>
              <br></br>
              <br></br>
              <div className="col s12 m7">
                <button
                  onClick={this.handleAdd}
                  className="btn waves-effect waves-light pink lighten-1 hoverable"
                >
                  Add Transection
                  <i className="material-icons right">playlist_add</i>
                </button>
              </div>
              <div className="col s12 m5">
                <button
                  onClick={this.handleFriend}
                  className="btn waves-effect waves-light pink lighten-1 hoverable"
                >
                  Add Friend
                  <i className="material-icons right">group_add</i>
                </button>
              </div>

              <br></br>
            </div>
            {ownerInfo}
            <div className="card-panel hoverable">
              <sub className="">Sharing</sub>
              <br></br>
              <blockquote>{inviteCount}</blockquote>
              <blockquote>{sharingInfo}</blockquote>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    transections: state.transection.transections,
    balance: state.transection.balance,
    account: state.transection.account
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getTransections: accountId => dispatch(getTransections(accountId)),
    addTransections: accountId => dispatch(addTransections(accountId)),
    deleteTransection: (transectionId, accId) =>
      dispatch(deleteTransection(transectionId, accId)),
    editTransection: (transectionId, newCategory, newAmount,accId) =>
      dispatch(editTransection(transectionId, newCategory, newAmount,accId)),
    addFriend: (friendEmail, accountId) =>
      dispatch(addFriend(friendEmail, accountId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransectionList);
