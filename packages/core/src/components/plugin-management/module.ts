import { ContainerModule } from "microinject";

import { PluginAdapterFactoryImpl } from "./impl/PluginAdapterFactoryImpl";
import { PluginThingFactoryImpl } from "./impl/PluginThingFactoryImpl";
import { PluginManagerImpl } from "./impl/PluginManagerImpl";

export default new ContainerModule((bind) => {
  bind(PluginAdapterFactoryImpl);
  bind(PluginManagerImpl);
  bind(PluginThingFactoryImpl);
});
