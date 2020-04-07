import { ContainerModule, composeModules } from "microinject";

import { Restifier } from "./Restifier";
import { Endpoint } from "./Endpoint";

import ControllersModule from "./controllers/module";

const RootEndpointModule = new ContainerModule((bind) => {
  bind(Restifier);
  bind(Endpoint);
});

export default composeModules(RootEndpointModule, ControllersModule);
