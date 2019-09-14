import { composeModules } from "microinject";

import EndpointModule from "./services/Endpoint/module";
import MozIotModule from "./services/MozIot/module";
import ReplModule from "./services/Repl/module";
import ZWavePluginModule from "./services/ZWavePlugin/module";

export default composeModules(
  EndpointModule,
  MozIotModule,
  ReplModule,
  ZWavePluginModule
);
