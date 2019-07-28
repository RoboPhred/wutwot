import { ContainerModule } from "microinject";

import { PropertyRepositoryImpl } from "./components/impl/PropertyRepositoryImpl";
import { PropertyFactoryImpl } from "./components/impl/PropertyFactoryImpl";
import { PropertyServiceImpl } from "./services/impl/PropertyServiceImpl";

export default new ContainerModule(bind => {
  bind(PropertyRepositoryImpl);
  bind(PropertyFactoryImpl);
  bind(PropertyServiceImpl);
});
