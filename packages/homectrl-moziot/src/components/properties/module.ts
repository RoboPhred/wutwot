import { ContainerModule } from "microinject";

import { LocalPropertiesManagerImpl } from "./impl/LocalPropertiesManagerImpl";
import { PropertyEventSourceImpl } from "./impl/PropertyEventSourceImpl";

export default new ContainerModule(bind => {
  bind(LocalPropertiesManagerImpl);
  bind(PropertyEventSourceImpl);
});
