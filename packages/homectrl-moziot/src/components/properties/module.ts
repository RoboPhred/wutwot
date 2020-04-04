import { ContainerModule } from "microinject";

import { LocalPropertyManagerImpl } from "./impl/LocalPropertyManagerImpl";
import { PropertyEventSourceImpl } from "./impl/PropertyEventSourceImpl";

export default new ContainerModule(bind => {
  bind(LocalPropertyManagerImpl);
  bind(PropertyEventSourceImpl);
});
