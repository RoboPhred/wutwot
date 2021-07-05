import { ContainerModule } from "microinject";

import { PluginBinderImpl } from "./impl/PluginBinderImpl";
import { PluginThingFactoryImpl } from "./impl/PluginThingFactoryImpl";
import { PluginManagerImpl } from "./impl/PluginManagerImpl";
import { PluginThingsManagerImpl } from "./impl/PluginThingsManagerImpl";

export default new ContainerModule((bind) => {
  bind(PluginBinderImpl);
  bind(PluginManagerImpl);
  bind(PluginThingFactoryImpl);
  bind(PluginThingsManagerImpl);
});
