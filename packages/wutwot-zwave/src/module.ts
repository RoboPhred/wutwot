import { ContainerModule } from "microinject";

import { MultilevelSwitchMonitorFactoryImpl } from "./impl/monitors/MultilevelSwitchMonitorFactoryImpl";
import { CentralSceneMonitorFactoryImpl } from "./impl/monitors/CentralSceneMonitorFactoryImpl";
import { NameLocationMonitorFactoryImpl } from "./impl/monitors/NameLocationMonitorFactoryImpl";
import { NodeHealthMonitoryFactoryImpl } from "./impl/monitors/NodeHealthMonitorFactoryImpl";

import { AdapterLocatorImpl } from "./impl/AdapterLocatorImpl";
import { ZWaveThingHandlerFactoryImpl } from "./impl/ZWaveThingHandlerFactoryImpl";
import { ZWaveThingMapperImpl } from "./impl/ZWaveThingMapperImpl";
import { ZWaveProviderImpl } from "./impl/ZWaveProviderImpl";

export default new ContainerModule((bind) => {
  bind(MultilevelSwitchMonitorFactoryImpl);
  bind(CentralSceneMonitorFactoryImpl);
  bind(NameLocationMonitorFactoryImpl);
  bind(NodeHealthMonitoryFactoryImpl);

  bind(AdapterLocatorImpl);
  bind(ZWaveThingHandlerFactoryImpl);
  bind(ZWaveThingMapperImpl);
  bind(ZWaveProviderImpl);
});
