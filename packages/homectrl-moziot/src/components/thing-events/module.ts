import { ContainerModule } from "microinject";

import { EventEventSourceImpl } from "./impl/EventEventSourceImpl";
import { EventServiceImpl } from "./impl/LocalEventsManagerImpl";

export default new ContainerModule(bind => {
  bind(EventEventSourceImpl);
  bind(EventServiceImpl);
});
