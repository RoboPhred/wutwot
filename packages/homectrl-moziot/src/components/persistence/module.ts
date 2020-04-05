import { ContainerModule } from "microinject";

import { DatabaseImpl } from "./impl/DatabaseImpl";

export default new ContainerModule(bind => {
  bind(DatabaseImpl);
});
