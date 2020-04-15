import { ContainerModule } from "microinject";

import { CorsOrigin, RootURL, Port, ZWavePort } from "./identifiers";

export default new ContainerModule((bind) => {
  bind(RootURL).toConstantValue("http://localhost:8080");
  bind(Port).toConstantValue(8080);
  bind(CorsOrigin).toConstantValue("*");

  if (process.env.HOMECTRL_ZWAVE_PORT) {
    bind(ZWavePort).toConstantValue(process.env.HOMECTRL_ZWAVE_PORT);
  }
});
