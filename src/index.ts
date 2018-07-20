import { Container } from "microinject";

import createModule from "./module";

const appModule = createModule();

const container = new Container();
container.load(appModule);
