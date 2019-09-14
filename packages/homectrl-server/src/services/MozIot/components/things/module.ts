import { ContainerModule } from "microinject";

import { ThingFactoryImpl } from "./components/impl/ThingFactoryImpl";
import { ThingRepositoryImpl } from "./components/impl/ThingRepositoryImpl";

import { ThingServiceImpl } from "./services/impl/ThingServiceImpl";
import { ThingEventSourceImpl } from "./services/impl/ThingEventSourceImpl";

export default new ContainerModule(bind => {
  bind(ThingFactoryImpl);
  bind(ThingRepositoryImpl);

  bind(ThingEventSourceImpl);
  bind(ThingServiceImpl);
});
