import { ContainerModule } from "microinject";

import { ActionServiceImpl } from "./services/impl/ActionServiceImpl";

import { ActionRepositoryImpl } from "./components/impl/ActionRepositoryImpl";
import { ActionFactoryImpl } from "./components/impl/ActionFactoryImpl";

export default new ContainerModule(bind => {
  bind(ActionServiceImpl);
  bind(ActionFactoryImpl);
  bind(ActionRepositoryImpl);
});
