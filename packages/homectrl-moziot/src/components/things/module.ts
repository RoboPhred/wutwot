import { ContainerModule } from "microinject";

import { InternalThingFactory } from "./components";

import { internalThingFactoryImpl } from "./impl/InternalThingFactoryImpl";
import { InternalThingImpl } from "./impl/InternalThingImpl";
import { ThingEventSourceImpl } from "./impl/ThingEventSourceImpl";
import { ThingIdMapperImpl } from "./impl/ThingIdMapperImpl";
import { ThingLocalPersistenceImpl } from "./impl/ThingLocalPersistenceImpl";
import { ThingsManagerImpl } from "./impl/ThingsManagerImpl";

export default new ContainerModule((bind) => {
  bind(InternalThingFactory)
    .toFactory(internalThingFactoryImpl)
    .inSingletonScope();
  bind(InternalThingImpl);
  bind(ThingEventSourceImpl);
  bind(ThingIdMapperImpl);
  bind(ThingLocalPersistenceImpl);
  bind(ThingsManagerImpl);
});
