import { composeModules } from "microinject";

import pluginModule from "./plugin-management/module";

const mozIotModule = composeModules(pluginModule);
export default mozIotModule;
