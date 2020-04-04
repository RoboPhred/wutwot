import { ContainerModule } from "microinject";

import { LocalSemanticTypeManagerImpl } from "./impl/LocalSemanticTypeManagerImpl";

export default new ContainerModule(bind => {
  bind(LocalSemanticTypeManagerImpl);
});
