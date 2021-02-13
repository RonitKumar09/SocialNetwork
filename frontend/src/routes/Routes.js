import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import Profile from '../components/Profile';
import SignUp from '../components/SignUp';

const Routes = () => {
  return (
    <Switch>
      <Route path="/profile" component={Profile}></Route>
      <Route path="/signup" component={SignUp}></Route>
      <Route path="/home" component={Home}></Route>
      <Route path="/" component={Home}></Route>
    </Switch>
  );
};

export default Routes;
