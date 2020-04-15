import * as React from "react";

import { Switch, Route, Redirect } from "react-router";

import ThingsPage from "./pages/Things";
import SwitchesPage from "./pages/Switches";

const Router: React.FC = () => (
  <Switch>
    <Redirect path="/" exact to="/switches" />
    <Route path="/switches" exact component={SwitchesPage} />
    <Route path="/things" exect component={ThingsPage} />
  </Switch>
);

export default Router;
