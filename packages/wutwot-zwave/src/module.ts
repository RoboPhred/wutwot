import { ContainerModule } from "microinject";

import { MultilevelSwitchMonitorFactoryImpl } from "./impl/monitors/MultilevelSwitchMonitorFactoryImpl";
import { CentralSceneMonitorFactoryImpl } from "./impl/monitors/CentralSceneMonitorFactoryImpl";

import { AdapterLocatorImpl } from "./impl/AdapterLocatorImpl";
import { ZWaveEndpointHandlerFactoryImpl } from "./impl/ZWaveEndpointHandlerFactoryImpl";
import { ZWaveEndpointThingMapperImpl } from "./impl/ZWaveEndpointThingMapper";
import { ZWaveProviderImpl } from "./impl/ZWaveProviderImpl";

export default new ContainerModule((bind) => {
  bind(MultilevelSwitchMonitorFactoryImpl);
  bind(CentralSceneMonitorFactoryImpl);

  bind(AdapterLocatorImpl);
  bind(ZWaveEndpointHandlerFactoryImpl);
  bind(ZWaveEndpointThingMapperImpl);
  bind(ZWaveProviderImpl);
});
