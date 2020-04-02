import { ContainerModule } from "microinject";

import { EventFactoryImpl } from "./components/impl/EventFactoryImpl";
import { EventRepositoryImpl } from "./components/impl/EventRepositoryImpl";
import { EventEventSourceImpl } from "./services/impl/EventEventSourceImpl";
import { EventServiceImpl } from "./services/impl/EventServiceImpl";

export default new ContainerModule(bind => {
  bind(EventFactoryImpl);
  bind(EventRepositoryImpl);
  bind(EventEventSourceImpl);
  bind(EventServiceImpl);
});
