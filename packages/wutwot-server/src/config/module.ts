import { ContainerModule } from "microinject";

import {
  CorsOrigin,
  Port,
  ZWavePort,
  Hostname,
  WutWotPluginConfig,
} from "./identifiers";

export default new ContainerModule((bind) => {
  bind(WutWotPluginConfig).toConstantValue(process.env.WUTWOT_PLUGINS);

  bind(Hostname).toConstantValue(
    process.env.WUTWOT_HTTP_HOSTNAME ?? "localhost",
  );
  bind(Port).toConstantValue(process.env.WUTWOT_HTTP_PORT ?? 8080);
  bind(CorsOrigin).toConstantValue(process.env.WUTWOT_HTTP_CORS_ORIGIN ?? "*");

  if (process.env.WUTWOT_ZWAVE_PORT) {
    bind(ZWavePort).toConstantValue(process.env.WUTWOT_ZWAVE_PORT);
  }
});
