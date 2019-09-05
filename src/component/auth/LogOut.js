import React from "react";
const LogOut = () => {
  localStorage.clear();
  localStorage.setItem("userStatus", "out");
  window.location = "/";
  return <div className="account-list section">Loging Out....</div>;
};

export default LogOut;
