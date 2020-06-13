import CreatePoint from 'pages/CreatePoint';
import Home from 'pages/Home';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={CreatePoint} path="/create-point" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
