import { ContainerModule } from "microinject";

import { ThingsRoot } from "./things/root";
import { ThingById } from "./things/by-id";

export default new ContainerModule(bind => {
  bind(ThingsRoot);
  bind(ThingById);
});
