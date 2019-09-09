import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import Dashboard from "./component/dashboard/Dashboard";
import SignIn from "./component/auth/SignIn";
import SignUp from "./component/auth/SignUp";
import Index from "./component/dashboard/Index";
import CreateAccount from "./component/account/CreateAccount";
import LogOut from "./component/auth/LogOut";
import history from "./history";
import TransectionList from "./component/Transection/TransectionList";

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Index}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
          <Route path="/signin" component={SignIn}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/create" component={CreateAccount}></Route>
          <Route path="/logout" component={LogOut}></Route>
          <Route path="/viewaccount/:id" component={TransectionList}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
