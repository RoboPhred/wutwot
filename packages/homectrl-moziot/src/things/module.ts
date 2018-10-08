import { ContainerModule } from "microinject";

import { ThingServiceImpl } from "./services/impl/ThingServiceImpl";

import { ThingFactoryImpl } from "./components/impl/ThingFactoryImpl";
import { ThingRepositoryImpl } from "./components/impl/ThingRepositoryImpl";

export default new ContainerModule(bind => {
  bind(ThingServiceImpl);
  bind(ThingFactoryImpl);
  bind(ThingRepositoryImpl);
});
