import { ContainerModule } from "microinject";

import { ThingFactoryImpl } from "./impl/ThingFactoryImpl";
import { ThingManagerImpl } from "./impl/ThingManagerImpl";

export default new ContainerModule(bind => {
  bind(ThingFactoryImpl);
  bind(ThingManagerImpl);
});
