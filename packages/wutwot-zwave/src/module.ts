import { ContainerModule } from "microinject";

import { MultilevelSwitchMonitorFactoryImpl } from "./impl/monitors/MultilevelSwitchMonitorFactoryImpl";
import { CentralSceneMonitorFactoryImpl } from "./impl/monitors/CentralSceneMonitorFactoryImpl";

import { AdapterLocatorImpl } from "./impl/AdapterLocatorImpl";
import { ZWaveThingHandlerFactoryImpl } from "./impl/ZWaveThingHandlerFactoryImpl";
import { ZWaveThingMapperImpl } from "./impl/ZWaveThingMapperImpl";
import { ZWaveProviderImpl } from "./impl/ZWaveProviderImpl";

export default new ContainerModule((bind) => {
  bind(MultilevelSwitchMonitorFactoryImpl);
  bind(CentralSceneMonitorFactoryImpl);

  bind(AdapterLocatorImpl);
  bind(ZWaveThingHandlerFactoryImpl);
  bind(ZWaveThingMapperImpl);
  bind(ZWaveProviderImpl);
});
