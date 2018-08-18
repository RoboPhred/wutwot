import { composeModules } from "microinject";

import actionsModule from "./actions/module";
import thingsModule from "./things/module";

export default composeModules(actionsModule, thingsModule);
