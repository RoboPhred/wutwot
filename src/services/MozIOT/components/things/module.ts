import { ContainerModule } from "microinject";

import { ThingManagerImpl } from "./impl/ThingManagerImpl";

export default new ContainerModule(bind => {
  bind(ThingManagerImpl);
});
