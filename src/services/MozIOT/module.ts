import { composeModules } from "microinject";

import actionsModule from "./components/actions/module";
import thingsModule from "./components/things/module";

export default composeModules(actionsModule, thingsModule);
