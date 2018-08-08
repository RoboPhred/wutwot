import { ContainerModule } from "microinject";

import { ThingAggregatorImpl } from "./impl/ThingAggregatorImpl";
import { ThingFactoryImpl } from "./impl/ThingFactoryImpl";
import { ThingManagerImpl } from "./impl/ThingManagerImpl";

export default new ContainerModule(bind => {
  bind(ThingAggregatorImpl);
  bind(ThingFactoryImpl);
  bind(ThingManagerImpl);
});
