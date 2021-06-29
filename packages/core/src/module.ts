import { composeModules } from "microinject";

import actionRequestModule from "./components/action-requests/module";
import actionModule from "./components/actions/module";
import persistenceModule from "./components/persistence/module";
import pluginModule from "./components/plugin-management/module";
import propertiesModule from "./components/properties/module";
import thingEventsModule from "./components/thing-events/module";
import thingModule from "./components/things/module";

const wutwotModule = composeModules(
  actionRequestModule,
  actionModule,
  persistenceModule,
  pluginModule,
  propertiesModule,
  thingEventsModule,
  thingModule,
);
export default wutwotModule;
