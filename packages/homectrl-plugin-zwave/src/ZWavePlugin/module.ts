import { ContainerModule } from "microinject";

import { NodeMonitorFactoryImpl } from "./components/impl/NodeMonitorFactoryImpl";
import { PropertyMonitorFactoryImpl } from "./components/impl/PropertyMonitorFactoryImpl";

import { ZWavePlugin } from "./ZWavePlugin";

export default new ContainerModule(bind => {
  bind(NodeMonitorFactoryImpl);
  bind(PropertyMonitorFactoryImpl);
  bind(ZWavePlugin);
});
