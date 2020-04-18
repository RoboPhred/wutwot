import * as React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import ThingsPage from "@/pages/ThingsPage";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/things" exact component={ThingsPage} />
    <Redirect to="/things" />
  </Switch>
);
export default Routes;
