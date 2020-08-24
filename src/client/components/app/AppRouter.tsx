import React, { lazy } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

const HomeContainer = lazy(() => import('../home/HomeContainer'));

const AppRouter: React.FunctionComponent = () => (
  <Switch>
    <Route path="/">
      <HomeContainer />
    </Route>
    <Redirect from="*" to="/" />
  </Switch>
);

export default AppRouter;
