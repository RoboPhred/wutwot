import { ContainerModule } from "microinject";

import { ActionEventSourceImpl } from "./impl/ActionEventSourceImpl";
import { ActionServiceImpl } from "./impl/LocalActionsManagerImpl";

export default new ContainerModule(bind => {
  bind(ActionEventSourceImpl);
  bind(ActionServiceImpl);
});
