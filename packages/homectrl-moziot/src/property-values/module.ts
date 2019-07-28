import { ContainerModule } from "microinject";

import { PropertyValueRegistryImpl } from "./services/impl/PropertyValueRegistryImpl";

export default new ContainerModule(bind => {
  bind(PropertyValueRegistryImpl);
});
