import * as React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import SettingsPage from "@/pages/SettingsPage";
import ThingsPage from "@/pages/ThingsPage";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/settings" exact component={SettingsPage} />
    <Route path="/things" exact component={ThingsPage} />
    <Redirect to="/things" />
  </Switch>
);
export default Routes;
