import { ContainerModule } from "microinject";

import { ThingsRoot } from "./things/root";
import { ThingById } from "./things/by-id";
import { ThingActionsRoot } from "./things/actions/root";
import { ThingActionById } from "./things/actions/by-id";
import { ThingActionRequest } from "./things/actions/request";
import { PropertiesRoot } from "./things/properties/root";
import { PropertiesById } from "./things/properties/by-id";

export default new ContainerModule((bind) => {
  bind(ThingsRoot);
  bind(ThingById);
  bind(ThingActionsRoot);
  bind(ThingActionById);
  bind(ThingActionRequest);
  bind(PropertiesRoot);
  bind(PropertiesById);
});
