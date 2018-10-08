import { ContainerModule } from "microinject";

import { ActionRequestServiceImpl } from "./services/impl/ActionRequestServiceImpl";

import { ActionRequestFactoryImpl } from "./components/impl/ActionRequestFactoryImpl";
import { ActionRequestRepositoryImpl } from "./components/impl/ActionRequestRepositoryImpl";

export default new ContainerModule(bind => {
  bind(ActionRequestServiceImpl);
  bind(ActionRequestFactoryImpl);
  bind(ActionRequestRepositoryImpl);
});
