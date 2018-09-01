import { composeModules } from "microinject";

import actionModule from "./actions/module";
import actionRequestModule from "./action-requests/module";
import pluginModule from "./plugin-management/module";
import thingModule from "./things/module";
import utilsModule from "./utils/module";

const mozIotModule = composeModules(
  actionModule,
  actionRequestModule,
  pluginModule,
  thingModule,
  utilsModule
);
export default mozIotModule;
