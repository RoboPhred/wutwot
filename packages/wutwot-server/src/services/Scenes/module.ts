import { ContainerModule } from "microinject";
import { ScenesPlugin } from "@wutwot/scenes";

import { WutWotPlugin } from "../WutWot";

export default new ContainerModule((bind) => {
  bind(WutWotPlugin)
    .provides(ScenesPlugin)
    .toFactory(() => new ScenesPlugin())
    .inSingletonScope();
});
