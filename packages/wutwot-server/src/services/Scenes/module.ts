import { ContainerModule } from "microinject";
import { ScenesPlugin } from "@wutwot/scenes";

import { ZWavePort } from "../../config";

import { MozIotPlugin } from "../MozIot";

export default new ContainerModule((bind) => {
  bind(MozIotPlugin)
    .provides(ScenesPlugin)
    .toFactory((context) => {
      let zwavePort: string | undefined;
      if (context.has(ZWavePort)) {
        zwavePort = context.get(ZWavePort);
      }
      return new ScenesPlugin();
    })
    .inSingletonScope();
});
