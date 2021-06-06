import { composeModules } from "microinject";

import ConfigModule from "./config/module";
import EndpointModule from "./services/Endpoint/module";
import WutWotModule from "./services/WutWot/module";
import ReplModule from "./services/Repl/module";

export default composeModules(
  ConfigModule,
  EndpointModule,
  WutWotModule,
  ReplModule,
);
