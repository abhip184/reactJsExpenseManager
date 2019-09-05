import React from "react";

const AccountTransections = props => {
  const id = props.match.params.id;
  return (
    <div className="container section account-transection">
      <div className="card">
        <div className="card-content indingo-text">
          <span className="card-title">AccountTitle {id}</span>
          <p>
            Transections<br></br>By
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountTransections;
