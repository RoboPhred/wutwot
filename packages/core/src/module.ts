import { composeModules } from "microinject";

import actionRequestsModule from "./components/action-requests/module";
import actionsModule from "./components/actions/module";
import actorsModule from "./components/actors/module";
import persistenceModule from "./components/persistence/module";
import pluginModule from "./components/plugin-management/module";
import propertiesModule from "./components/properties/module";
import thingEventsModule from "./components/thing-events/module";
import thingsModule from "./components/things/module";

const wutwotModule = composeModules(
  actionRequestsModule,
  actionsModule,
  actorsModule,
  persistenceModule,
  pluginModule,
  propertiesModule,
  thingEventsModule,
  thingsModule,
);
export default wutwotModule;
