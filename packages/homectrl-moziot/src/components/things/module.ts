import { ContainerModule } from "microinject";

import { InternalThingFactory } from "./components";
import { internalThingFactoryImpl } from "./components/impl/InternalThingFactoryImpl";
import { InternalThingImpl } from "./components/impl/InternalThingImpl";
import { ThingRepositoryImpl } from "./components/impl/ThingRepositoryImpl";

import { ThingServiceImpl } from "./services/impl/ThingServiceImpl";
import { ThingEventSourceImpl } from "./services/impl/ThingEventSourceImpl";

export default new ContainerModule(bind => {
  bind(InternalThingFactory)
    .toFactory(internalThingFactoryImpl)
    .inSingletonScope();
  bind(InternalThingImpl);
  bind(ThingRepositoryImpl);

  bind(ThingEventSourceImpl);
  bind(ThingServiceImpl);
});
