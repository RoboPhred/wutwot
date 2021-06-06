import { ContainerModule } from "microinject";
import { ModelPlugin } from "@wutwot/model";

import { WutWotPlugin } from "../WutWot";

export default new ContainerModule((bind) => {
  bind(WutWotPlugin)
    .provides(ModelPlugin)
    .toFactory(() => new ModelPlugin())
    .inSingletonScope();
});
