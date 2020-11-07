import { ContainerModule } from "microinject";
import { ZWavePlugin } from "@wutwot/zwave";

import { ZWavePort } from "../../config";

import { WutWotPlugin } from "../WutWot";

export default new ContainerModule((bind) => {
  bind(WutWotPlugin)
    .provides(ZWavePlugin)
    .toFactory((context) => {
      let zwavePort: string | undefined;
      if (context.has(ZWavePort)) {
        zwavePort = context.get(ZWavePort);
      }
      return new ZWavePlugin({ pluginId: "zwave", port: zwavePort });
    })
    .inSingletonScope();
});
