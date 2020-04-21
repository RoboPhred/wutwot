import * as React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import SettingsPage from "@/pages/SettingsPage";
import ThingDetailsPage from "@/pages/ThingDetailsPage";
import ThingRawDefinitionPage from "@/pages/ThingRawDefinitionPage";
import ThingSourcesSettingPage from "@/pages/ThingSourcesSettingPage";
import ThingsPage from "@/pages/ThingsPage";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/settings" exact component={SettingsPage} />
    <Route
      path="/settings/thing-sources"
      exact
      component={ThingSourcesSettingPage}
    />
    <Route path="/things" exact component={ThingsPage} />
    <Route path="/things/:thingId" exact component={ThingDetailsPage} />
    <Route
      path="/things/:thingId/definition"
      exact
      component={ThingRawDefinitionPage}
    />
    <Redirect to="/things" />
  </Switch>
);
export default Routes;
