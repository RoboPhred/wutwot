import { ContainerModule } from "microinject";

import { ActorResolverImpl } from "./impl/ActorResolverImpl";

export default new ContainerModule((bind) => {
  bind(ActorResolverImpl);
});
