import { composeModules } from "microinject";

import endpointModule from "./services/Endpoint/module";
import mozIOTModule from "./services/MozIOT/module";
import replModule from "./services/Repl/module";
import testAdapterModule from "./services/TestAdapter/module";

export default function createModule() {
  return composeModules(
    endpointModule,
    mozIOTModule,
    replModule,
    testAdapterModule
  );
}
