import { ContainerModule } from "microinject";

import { ThingsRoot } from "./things/root";
import { ThingById } from "./things/by-id";
import { ThingActionsRoot } from "./things/actions/root";
import { ThingActionById } from "./things/actions/by-id";
import { ThingActionRequest } from "./things/actions/request";

export default new ContainerModule(bind => {
  bind(ThingsRoot);
  bind(ThingById);
  bind(ThingActionsRoot);
  bind(ThingActionById);
  bind(ThingActionRequest);
});
