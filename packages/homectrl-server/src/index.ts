// import { install as installSourceMapSupport } from "source-map-support";
// installSourceMapSupport();

import { App } from "./App";

const app = new App();

process.on("SIGINT", async () => {
  await app.shutdown();
  process.exit(0);
});

app.run();
