import { composeModules } from "microinject";

import pluginModule from "./plugin-management/module";
import thingModule from "./things/module";

const mozIotModule = composeModules(pluginModule, thingModule);
export default mozIotModule;
