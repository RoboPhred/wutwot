import { ContainerModule } from "microinject";

import { AdapterLocatorImpl } from "./components/impl/AdapterLocatorImpl";
import { NodeMonitorFactoryImpl } from "./components/impl/NodeMonitorFactoryImpl";
import { ZWaveProviderImpl } from "./components/impl/ZWaveProviderImpl";
import { ZWaveThingAdapterImpl } from "./components/impl/ZWaveThingAdapterImpl";

export default new ContainerModule(bind => {
  bind(AdapterLocatorImpl);
  bind(NodeMonitorFactoryImpl);
  bind(ZWaveProviderImpl);
  bind(ZWaveThingAdapterImpl);
});
