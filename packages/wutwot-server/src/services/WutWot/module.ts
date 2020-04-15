import { ContainerModule } from "microinject";
import { WutWot } from "@wutwot/core";

import { WutWotPlugin } from "./identifiers";

export default new ContainerModule((bind) => {
  bind(WutWot)
    .toFactory((context) => {
      const plugins = context.getAll(WutWotPlugin);
      return new WutWot(plugins);
    })
    .inSingletonScope();
});
