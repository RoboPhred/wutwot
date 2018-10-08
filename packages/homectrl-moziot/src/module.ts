import { composeModules } from "microinject";

import actionModule from "./actions/module";
import actionRequestModule from "./action-requests/module";
import pluginModule from "./plugin-management/module";
import thingTypesModule from "./thing-types/module";
import thingModule from "./things/module";

const mozIotModule = composeModules(
  actionModule,
  actionRequestModule,
  pluginModule,
  thingTypesModule,
  thingModule
);
export default mozIotModule;
