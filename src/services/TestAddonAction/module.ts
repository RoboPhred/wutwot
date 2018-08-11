import { ContainerModule } from "microinject";

import { TestAddonActionSource } from "./TestAddonActionSource";

export default new ContainerModule(bind => {
  bind(TestAddonActionSource);
});
