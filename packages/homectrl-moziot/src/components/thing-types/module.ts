import { ContainerModule } from "microinject";

import { ThingTypeServiceImpl } from "./services/impl/ThingTypeServiceImpl";

export default new ContainerModule(bind => {
  bind(ThingTypeServiceImpl);
});
