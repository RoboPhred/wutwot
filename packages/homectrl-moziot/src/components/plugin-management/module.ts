import { ContainerModule } from "microinject";

import { PluginAdapterFactoryImpl } from "./components/impl/PluginAdapterFactoryImpl";
import { PluginManagerImpl } from "./components/impl/PluginManagerImpl";
import { PluginThingActionFactoryImpl } from "./components/impl/PluginThingActionFactoryImpl";
import { PluginThingFactoryImpl } from "./components/impl/PluginThingFactoryImpl";

export default new ContainerModule(bind => {
  bind(PluginAdapterFactoryImpl);
  bind(PluginManagerImpl);
  bind(PluginThingActionFactoryImpl);
  bind(PluginThingFactoryImpl);
});
