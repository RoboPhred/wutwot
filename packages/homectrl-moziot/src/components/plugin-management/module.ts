import { ContainerModule } from "microinject";

import { PluginAdapterFactoryImpl } from "./impl/PluginAdapterFactoryImpl";
import { PluginThingActionFactoryImpl } from "./impl/PluginThingActionFactoryImpl";
import { PluginThingFactoryImpl } from "./impl/PluginThingFactoryImpl";
import { PluginManagerImpl } from "./impl/PluginManagerImpl";

export default new ContainerModule(bind => {
  bind(PluginAdapterFactoryImpl);
  bind(PluginManagerImpl);
  bind(PluginThingActionFactoryImpl);
  bind(PluginThingFactoryImpl);
});
