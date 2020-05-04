import { ContainerModule } from "microinject";

import { CorsOrigin, Port, ZWavePort, Hostname } from "./identifiers";

export default new ContainerModule((bind) => {
  bind(Hostname).toConstantValue("http://localhost");
  bind(Port).toConstantValue(8080);
  bind(CorsOrigin).toConstantValue("*");

  if (process.env.HOMECTRL_ZWAVE_PORT) {
    bind(ZWavePort).toConstantValue(process.env.HOMECTRL_ZWAVE_PORT);
  }
});
