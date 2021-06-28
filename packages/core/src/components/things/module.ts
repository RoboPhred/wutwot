import { ContainerModule } from "microinject";

import { InternalThingFactory } from "./components";

import { internalThingFactoryImpl } from "./impl/InternalThingFactoryImpl";
import { InternalThingImpl } from "./impl/InternalThingImpl";
import { ThingEventSourceImpl } from "./impl/ThingEventSourceImpl";
import { ThingLocalPersistenceImpl } from "./impl/ThingLocalPersistence";
import { ThingsManagerImpl } from "./impl/ThingsManagerImpl";

export default new ContainerModule((bind) => {
  bind(InternalThingFactory)
    .toFactory(internalThingFactoryImpl)
    .inSingletonScope();
  bind(InternalThingImpl);
  bind(ThingEventSourceImpl);
  bind(ThingLocalPersistenceImpl);
  bind(ThingsManagerImpl);
});
