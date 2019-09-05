import React from "react";
import { Link } from "react-router-dom";
import SignInLink from "./SignInLink";
import SignOutLink from "./SignOutLink";
const Navbar = () => {
  console.log(localStorage.getItem("email"));
  console.log(localStorage.getItem("userId"));
  console.log(localStorage.getItem("firstName"));
  console.log(localStorage.getItem("email"));
  if (localStorage.getItem("userStatus") === "in") {
    return (
      <nav className="nav-wrapper indigo">
        <div className="container">
          <Link to="/dashboard" className="brand-logo">
            Expense Manager
          </Link>
          <SignInLink />
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="nav-wrapper indigo">
        <div className="container">
          <Link to="/" className="brand-logo">
            Expense Manager
          </Link>
          <SignOutLink />
        </div>
      </nav>
    );
  }
};

export default Navbar;
