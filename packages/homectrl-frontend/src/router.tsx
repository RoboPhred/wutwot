import * as React from "react";

import { Switch, Route, Redirect } from "react-router";

import ThingsPage from "./pages/Things";

const Router: React.FC = () => (
  <Switch>
    <Redirect path="/" exact to="/things" />
    <Route path="/things" exect component={ThingsPage} />
  </Switch>
);

export default Router;
