import { ContainerModule } from "microinject";
import { ZWavePlugin } from "homectrl-plugin-zwave";

import { ZWavePort } from "../../config";

import { MozIotPlugin } from "../MozIot";

export default new ContainerModule(bind => {
  bind(MozIotPlugin)
    .provides(ZWavePlugin)
    .toDynamicValue(context => {
      let zwavePort: string | undefined;
      if (context.has(ZWavePort)) {
        zwavePort = context.get(ZWavePort);
      }
      return new ZWavePlugin({ port: zwavePort });
    })
    .inSingletonScope();
});
