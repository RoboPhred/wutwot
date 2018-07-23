import { composeModules } from "microinject";

import createServicesModule from "./services/module";

export default function createModule() {
  return composeModules(createServicesModule());
}
