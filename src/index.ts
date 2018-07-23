import { Container } from "microinject";

import createModule from "./module";

import { ReplServer } from "./Repl/ReplServer";

const appModule = createModule();

const container = new Container();
container.load(appModule);

if (process.stdin.isTTY) {
  const repl = container.get(ReplServer);
  repl.start();
}
