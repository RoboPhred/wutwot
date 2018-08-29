import { ContainerModule } from "microinject";

import { ThingRepositoryImpl } from "./components/impl/ThingRepositoryImpl";

export default new ContainerModule(bind => {
  bind(ThingRepositoryImpl);
});
