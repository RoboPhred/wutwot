import { ContainerModule } from "microinject";

import { PropertyServiceImpl } from "./services/impl/PropertyServiceImpl";

export default new ContainerModule(bind => {
  bind(PropertyServiceImpl);
});
