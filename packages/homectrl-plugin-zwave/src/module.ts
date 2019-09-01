import { composeModules } from "microinject";

import zwaveModule from "./ZWave/module";
import pluginModule from "./ZWavePlugin/module";

export default composeModules(zwaveModule, pluginModule);
