import { ContainerModule } from "microinject";

import { ThingTypesServiceImpl } from "./services/impl/ThingTypesServiceImpl";

export default new ContainerModule(bind => {
  bind(ThingTypesServiceImpl);
});
