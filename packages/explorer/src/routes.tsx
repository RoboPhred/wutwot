import * as React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import {
  ThingsPagePath,
  ThingDetailsPagePath,
  ThingDefinitionPagePath,
  SettingsPagePath,
  ThingSourcesSettingPagePath,
} from "@/paths";

import SettingsPage from "@/pages/SettingsPage";
import ThingDetailsPage from "@/pages/ThingDetailsPage";
import ThingRawDefinitionPage from "@/pages/ThingRawDefinitionPage";
import ThingSourcesSettingPage from "@/pages/ThingSourcesSettingPage";
import ThingsPage from "@/pages/ThingsPage";

const Routes: React.FC = () => (
  <Switch>
    <Route path={ThingsPagePath.route} exact component={ThingsPage} />
    <Route
      path={ThingDetailsPagePath.route}
      exact
      component={ThingDetailsPage}
    />
    <Route
      path={ThingDefinitionPagePath.route}
      exact
      component={ThingRawDefinitionPage}
    />

    <Route path={SettingsPagePath.route} exact component={SettingsPage} />
    <Route
      path={ThingSourcesSettingPagePath.route}
      exact
      component={ThingSourcesSettingPage}
    />

    <Redirect to={ThingsPagePath.route} />
  </Switch>
);
export default Routes;
