import { install as installSourceMapSupport } from "source-map-support";
installSourceMapSupport();

import { Container } from "microinject";

import createModule from "./module";

import { Entrypoint } from "./contracts";

const appModule = createModule();

const container = new Container();
container.load(appModule);

const repl = container.getAll(Entrypoint);
repl.forEach(x => x.start());
