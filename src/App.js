import React from 'react';
import {BrowserRouter,Switch, Route} from 'react-router-dom'
import Navbar from './component/layout/Navbar'
import Dashboard from './component/dashboard/Dashboard';
import AccountTransections from './component/account/AccountTransections';
import SignIn from './component/auth/SignIn';
import SignUp from './component/auth/SignUp';
import CreateAccount from './component/account/CreateAccount';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
   <Navbar/>
   <Switch>
    <Route exact path="/" component={Dashboard}></Route>
    <Route path="/account/:id" component={AccountTransections}></Route>
    <Route path="/signin" component={SignIn}></Route>
    <Route path="/signup" component={SignUp}></Route>
    <Route path="/create" component={CreateAccount}></Route>
   </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
