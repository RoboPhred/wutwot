import { ContainerModule } from "microinject";

import { LocalSemanticTypesManagerImpl } from "./impl/LocalSemanticTypesManagerImpl";

export default new ContainerModule((bind) => {
  bind(LocalSemanticTypesManagerImpl);
});
