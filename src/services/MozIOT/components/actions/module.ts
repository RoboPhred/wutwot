import { ContainerModule } from "microinject";

import { ActionAggregatorImpl } from "./impl/ActionAggregatorImpl";

export default new ContainerModule(bind => {
  bind(ActionAggregatorImpl);
});
