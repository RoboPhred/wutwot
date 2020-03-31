import { ContainerModule } from "microinject";

import { MultilevelSwitchMonitorFactoryImpl } from "./components/impl/monitors/MultilevelSwitchMonitorFactoryImpl";
import { AdapterLocatorImpl } from "./components/impl/AdapterLocatorImpl";
import { ZThingAdapterFactoryImpl } from "./components/impl/ZThingAdapterFactoryImpl";
import { ZThingManagerImpl } from "./components/impl/ZThingManagerImpl";
import { ZWaveProviderImpl } from "./components/impl/ZWaveProviderImpl";

export default new ContainerModule(bind => {
  bind(MultilevelSwitchMonitorFactoryImpl);
  bind(AdapterLocatorImpl);
  bind(ZThingAdapterFactoryImpl);
  bind(ZThingManagerImpl);
  bind(ZWaveProviderImpl);
});
