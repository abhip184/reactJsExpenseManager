import React from "react";
import AccountSummary from "./AccountSummary";
/**
 *
 * @param {object} accounts accounts got from Dashboard component
 * @param {Function} handleDelete method defined in Dashboard.Js to delete account and will be passed to AccountSummary
 * @param {Function}handleEdit method defined in Dashboard.Js and to edit account will be passed to AccountSummary
 * @requires AccountSummary to render individual account
 */
const AccountList = ({ accounts, handleDelete, handleEdit }) => {
  return (
    <div className="account-list section">
      <div className="row">
        {accounts &&
          accounts.map(account => {
            return (
              <AccountSummary
                account={account}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                key={account._id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AccountList;
