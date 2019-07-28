import { ContainerModule } from "microinject";

import { PropertyRepositoryImpl } from "./components/impl/PropertyRepositoryImpl";
import { PropertyServiceImpl } from "./services/impl/PropertyServiceImpl";

export default new ContainerModule(bind => {
  bind(PropertyRepositoryImpl);
  bind(PropertyServiceImpl);
});
