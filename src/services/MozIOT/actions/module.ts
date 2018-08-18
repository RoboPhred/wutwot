import { ContainerModule } from "microinject";

import { ActionAggregatorImpl } from "./components/impl/ActionAggregatorImpl";

export default new ContainerModule(bind => {
  bind(ActionAggregatorImpl);
});
