import { composeModules, ContainerModule } from "microinject";

import zwaveModule from "./ZWave/module";
import { ZWavePlugin } from "./ZWavePlugin/ZWavePlugin";

export default composeModules(
  zwaveModule,
  new ContainerModule(bind => {
    bind(ZWavePlugin);
  })
);
