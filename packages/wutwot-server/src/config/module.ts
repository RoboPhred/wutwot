import { ContainerModule } from "microinject";

import { WutWotPluginConfig } from "./identifiers";

export default new ContainerModule((bind) => {
  bind(WutWotPluginConfig).toConstantValue(process.env.WUTWOT_PLUGINS);
});
