import "source-map-support/register";

// Pre-import module to avoid circular requires between components and app.
import "./module";

import { App } from "./App";

const app = new App();

process.on("SIGINT", async () => {
  await app.shutdown();
  process.exit(0);
});

app.run();
