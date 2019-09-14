import { ContainerModule } from "microinject";

import { PropertyRepositoryImpl } from "./components/impl/PropertyRepositoryImpl";
import { PropertyFactoryImpl } from "./components/impl/PropertyFactoryImpl";

import { PropertyServiceImpl } from "./services/impl/PropertyServiceImpl";
import { PropertyEventSourceImpl } from "./services/impl/PropertyEventSourceImpl";

export default new ContainerModule(bind => {
  bind(PropertyRepositoryImpl);
  bind(PropertyFactoryImpl);

  bind(PropertyEventSourceImpl);
  bind(PropertyServiceImpl);
});
