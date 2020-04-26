import { ContainerModule } from "microinject";

import { Endpoint } from "./Endpoint";

export default new ContainerModule((bind) => {
  bind(Endpoint);
});
