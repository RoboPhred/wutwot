import { ContainerModule } from "microinject";

import { ThingFactoryImpl } from "./components/impl/ThingFactoryImpl";
import { ThingRepositoryImpl } from "./components/impl/ThingRepositoryImpl";

export default new ContainerModule(bind => {
  bind(ThingFactoryImpl);
  bind(ThingRepositoryImpl);
});
