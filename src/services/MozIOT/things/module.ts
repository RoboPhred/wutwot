import { ContainerModule } from "microinject";

import { ThingFactoryImpl } from "./components/impl/ThingFactoryImpl";
import { ThingManagerImpl } from "./components/impl/ThingManagerImpl";

export default new ContainerModule(bind => {
  bind(ThingFactoryImpl);
  bind(ThingManagerImpl);
});
