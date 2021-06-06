import { composeModules } from "microinject";

import ConfigModule from "./config/module";
import EndpointModule from "./services/Endpoint/module";
import WutWotModule from "./services/WutWot/module";
import ModelModule from "./services/Model/module";
import ReplModule from "./services/Repl/module";
import ScenesModule from "./services/Scenes/module";
import ZWaveModule from "./services/ZWave/module";

export default composeModules(
  ConfigModule,
  EndpointModule,
  WutWotModule,
  ModelModule,
  ReplModule,
  ScenesModule,
  ZWaveModule,
);
