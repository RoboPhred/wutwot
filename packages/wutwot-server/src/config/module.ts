import { ContainerModule } from "microinject";

import { CorsOrigin, Port, ZWavePort, Hostname } from "./identifiers";

export default new ContainerModule((bind) => {
  bind(Hostname).toConstantValue(process.env.HOMECTRL_HOSTNAME ?? "localhost");
  bind(Port).toConstantValue(process.env.HOMECTRL_PORT ?? 8080);
  bind(CorsOrigin).toConstantValue(process.env.HOMECTRL_CORS_ORIGIN ?? "*");

  if (process.env.HOMECTRL_ZWAVE_PORT) {
    bind(ZWavePort).toConstantValue(process.env.HOMECTRL_ZWAVE_PORT);
  }
});
