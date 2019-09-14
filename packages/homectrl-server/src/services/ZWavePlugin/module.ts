import { ContainerModule } from "microinject";

import { AdapterLocatorImpl } from "./components/impl/AdapterLocatorImpl";
import { ZWaveDriverImpl } from "./components/impl/ZWaveDriverImpl";
import { NodeMonitorFactoryImpl } from "./components/impl/NodeMonitorFactoryImpl";
import { ZWavePlugin } from "./ZWavePlugin";

export default new ContainerModule(bind => {
  bind(AdapterLocatorImpl);
  bind(ZWaveDriverImpl);
  bind(NodeMonitorFactoryImpl);
  bind(ZWavePlugin);
});
