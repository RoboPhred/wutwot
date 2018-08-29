import { ContainerModule } from "microinject";

import { ActionRepositoryImpl } from "./components/impl/ActionRepositoryImpl";
import { ActionFactoryImpl } from "./components/impl/ActionFactoryImpl";

export default new ContainerModule(bind => {
  bind(ActionFactoryImpl);
  bind(ActionRepositoryImpl);
});
