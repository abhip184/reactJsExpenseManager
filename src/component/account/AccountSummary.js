import React from "react";
import { Link } from "react-router-dom";

const AccountSummary = ({ account, handleDelete, handleEdit }) => {
  const invites =
    account.invites && account.invites.length > 0 ? (
      <span>
        <blockquote>shared with{account.invites.length} friends</blockquote>
        <i className="truncate">{account.invites.join(",")}</i>
      </span>
    ) : (
      <blockquote>Not Shared</blockquote>
    );
  return (
    <div className="col s12 m3 l3">
      <div className="card small hoverable">
        <div className="card-content indigo-text">
          <Link to={"/viewAccount/" + account._id}>
            <span className="card-title indigo-text">
              <strong>
                {account.accountName.replace(
                  account.accountName[0],
                  account.accountName[0].toUpperCase()
                )}
              </strong>
            </span>
          </Link>
          <p>owner is :- {account.owner.email}</p>

          {invites}
          <div className="card-action">
            <div className="col s6 ">
              <button
                className="btn-flat z-depth-0 editBtn indigo-text darken-4"
                onClick={() => {
                  handleEdit(account._id, account.accountName);
                }}
              >
                EDIT
              </button>
            </div>
            <div className="col s6">
              <button
                className="btn-flat z-depth-0 deleteBtn red-text"
                onClick={() => {
                  handleDelete(account._id);
                }}
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
