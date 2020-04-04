import { ContainerModule } from "microinject";

import { InternalThingFactory } from "./components";

import { internalThingFactoryImpl } from "./impl/InternalThingFactoryImpl";
import { InternalThingImpl } from "./impl/InternalThingImpl";
import { ThingEventSourceImpl } from "./impl/ThingEventSourceImpl";
import { ThingManagerImpl } from "./impl/ThingManagerImpl";

export default new ContainerModule(bind => {
  bind(InternalThingFactory)
    .toFactory(internalThingFactoryImpl)
    .inSingletonScope();
  bind(InternalThingImpl);
  bind(ThingEventSourceImpl);
  bind(ThingManagerImpl);
});
