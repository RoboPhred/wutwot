import { composeModules } from "microinject";

import createThingManagerModule from "./ThingManager/module";

export default function createServicesModule() {
  return composeModules(createThingManagerModule());
}
