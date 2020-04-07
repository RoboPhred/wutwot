import { ContainerModule } from "microinject";

import { MultilevelSwitchMonitorFactoryImpl } from "./impl/monitors/MultilevelSwitchMonitorFactoryImpl";
import { CentralSceneMonitorFactoryImpl } from "./impl/monitors/CentralSceneMonitorFactoryImpl";

import { AdapterLocatorImpl } from "./impl/AdapterLocatorImpl";
import { ZThingAdapterFactoryImpl } from "./impl/ZThingAdapterFactoryImpl";
import { ZThingManagerImpl } from "./impl/ZThingManagerImpl";
import { ZWaveProviderImpl } from "./impl/ZWaveProviderImpl";

export default new ContainerModule((bind) => {
  bind(MultilevelSwitchMonitorFactoryImpl);
  bind(CentralSceneMonitorFactoryImpl);

  bind(AdapterLocatorImpl);
  bind(ZThingAdapterFactoryImpl);
  bind(ZThingManagerImpl);
  bind(ZWaveProviderImpl);
});
