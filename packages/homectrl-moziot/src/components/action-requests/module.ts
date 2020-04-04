import { ContainerModule } from "microinject";

import { ActionRequestEventSourceImpl } from "./impl/ActionRequestEventSourceImpl";
import { LocalActionRequestsManagerImpl } from "./impl/LocalActionRequestsManagerImpl";

export default new ContainerModule(bind => {
  bind(ActionRequestEventSourceImpl);
  bind(LocalActionRequestsManagerImpl);
});
