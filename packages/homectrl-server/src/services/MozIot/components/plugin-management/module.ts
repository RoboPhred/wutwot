import { ContainerModule } from "microinject";

import { PluginAdapterFactoryImpl } from "./components/impl/PluginAdapterFactoryImpl";
import { PluginManagerImpl } from "./components/impl/PluginManagerImpl";

export default new ContainerModule(bind => {
  bind(PluginAdapterFactoryImpl);
  bind(PluginManagerImpl);
});
