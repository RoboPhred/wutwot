import { ContainerModule } from "microinject";
import { ZWavePlugin } from "homectrl-plugin-zwave";

import { ZWavePort } from "../../config";

import { MozIotPlugin } from "../MozIot";

export default new ContainerModule((bind) => {
  bind(MozIotPlugin)
    .provides(ZWavePlugin)
    .toFactory((context) => {
      let zwavePort: string | undefined;
      if (context.has(ZWavePort)) {
        zwavePort = context.get(ZWavePort);
      }
      return new ZWavePlugin({ pluginId: "zwave-master", port: zwavePort });
    })
    .inSingletonScope();
});
