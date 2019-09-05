import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const SignInLink = () => {
  const userInitials = window.localStorage
    .getItem("userInitials")
    .toUpperCase();
  return (
    <ul className="right">
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/create">New Account</NavLink>
      </li>
      <li>
        <NavLink to="/logout">Log Out</NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating pink">
          {userInitials}
        </NavLink>
      </li>
    </ul>
  );
};
export default withRouter(SignInLink);
