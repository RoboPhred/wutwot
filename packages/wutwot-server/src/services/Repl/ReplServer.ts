import repl from "repl";
import { MozIot } from "@wutwot/core";
import { ZWavePlugin, METADATA_ZWAVE_NODE } from "@wutwot/zwave";
import { injectable, inject } from "microinject";

import { Entrypoint } from "../../contracts";

import { App } from "../../App";

@injectable(Entrypoint)
export class ReplServer implements Entrypoint {
  private _replServer: repl.REPLServer | undefined;

  constructor(
    @inject(App) private _app: App,
    @inject(MozIot) private _moziot: MozIot,
    @inject(ZWavePlugin) private _zwave: ZWavePlugin,
  ) {}

  start() {
    if (this._replServer) {
      return;
    }

    if (!process.stdin.isTTY) {
      return;
    }

    this._replServer = repl.start({
      prompt: ">",
    });
    const reset = (context: any) => {
      context.moziot = this._moziot;
      context.zwave = this._zwave;
      context.zwaveNodeMetadata = METADATA_ZWAVE_NODE;
    };
    reset(this._replServer.context);
    this._replServer.on("exit", async () => {
      await this._app.shutdown();
      process.exit(0);
    });
    this._replServer.on("reset", reset);
  }
}
