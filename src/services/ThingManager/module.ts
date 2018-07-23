import { ContainerModule } from "microinject";

import { ThingManagerImpl } from "./impl/ThingManagerImpl";

export default function createModule() {
  return new ContainerModule(bind => {
    bind(ThingManagerImpl);
  });
}
