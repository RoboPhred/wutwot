import { ContainerModule } from "microinject";

import { PluginAdapterFactoryImpl } from "./components/impl/PluginAdapterFactoryImpl";
import { PluginThingActionFactoryImpl } from "./components/impl/PluginThingActionFactoryImpl";
import { PluginThingFactoryImpl } from "./components/impl/PluginThingFactoryImpl";
import { PluginManagerImpl } from "./services/impl/PluginManagerImpl";

export default new ContainerModule(bind => {
  bind(PluginAdapterFactoryImpl);
  bind(PluginManagerImpl);
  bind(PluginThingActionFactoryImpl);
  bind(PluginThingFactoryImpl);
});
