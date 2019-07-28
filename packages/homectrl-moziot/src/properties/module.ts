import { ContainerModule } from "microinject";

import { PropertyEventeerImpl } from "./components/impl/PropertyEventeerImpl";
import { PropertyRepositoryImpl } from "./components/impl/PropertyRepositoryImpl";
import { PropertyFactoryImpl } from "./components/impl/PropertyFactoryImpl";
import { PropertyServiceImpl } from "./services/impl/PropertyServiceImpl";

export default new ContainerModule(bind => {
  bind(PropertyEventeerImpl);
  bind(PropertyRepositoryImpl);
  bind(PropertyFactoryImpl);
  bind(PropertyServiceImpl);
});
