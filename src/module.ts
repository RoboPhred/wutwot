import { composeModules } from "microinject";

import mozIOTModule from "./services/MozIOT/module";
import replModule from "./services/Repl/module";
import testAdapterModule from "./services/TestAdapter/module";

export default function createModule() {
  return composeModules(mozIOTModule, replModule, testAdapterModule);
}
