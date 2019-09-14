import { composeModules, ContainerModule } from "microinject";

import actionRequestModule from "./components/action-requests/module";
import actionModule from "./components/actions/module";
import pluginModule from "./components/plugin-management/module";
import propertiesModule from "./components/properties/module";
import thingTypesModule from "./components/thing-types/module";
import thingModule from "./components/things/module";

import { MozIot } from "./MozIot";

const rootModule = new ContainerModule(bind => {
  bind(MozIot).toSelf();
});

const mozIotModule = composeModules(
  rootModule,
  actionRequestModule,
  actionModule,
  pluginModule,
  propertiesModule,
  thingTypesModule,
  thingModule
);
export default mozIotModule;
