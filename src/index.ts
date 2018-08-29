import { install as installSourceMapSupport } from "source-map-support";
installSourceMapSupport();

import { App } from "./services/App";

new App().run();
