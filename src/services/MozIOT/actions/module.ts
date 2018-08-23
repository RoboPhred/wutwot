import { ContainerModule } from "microinject";

import { ThingRepositoryImpl } from "./components/impl/ActionRepositoryImpl";

export default new ContainerModule(bind => {
  bind(ThingRepositoryImpl);
});
