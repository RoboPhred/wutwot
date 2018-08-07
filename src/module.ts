import { composeModules } from "microinject";

import mozIOTModule from "./services/MozIOT/module";
import replModule from "./services/Repl/module";

export default function createModule() {
  return composeModules(mozIOTModule, replModule);
}
