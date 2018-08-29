import { composeModules } from "microinject";

import actionModule from "./actions/module";
import pluginModule from "./plugin-management/module";
import thingModule from "./things/module";

const mozIotModule = composeModules(actionModule, pluginModule, thingModule);
export default mozIotModule;
