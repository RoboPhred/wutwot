import repl from "repl";
import { WutWot } from "@wutwot/core";
import { METADATA_ZWAVE_NODE, METADATA_ZWAVE_ENDPOINT } from "@wutwot/zwave";
import { injectable, inject } from "microinject";

import { Entrypoint } from "../../contracts";

import { App } from "../../App";

import { WutWotPluginEnumerator } from "../WutWot";

@injectable(Entrypoint)
export class ReplServer implements Entrypoint {
  private _replServer: repl.REPLServer | undefined;

  constructor(
    @inject(App) private _app: App,
    @inject(WutWot) private _wutwot: WutWot,
    @inject(WutWotPluginEnumerator)
    private _wutwotPluginEnumerator: WutWotPluginEnumerator,
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
      context.wutwot = this._wutwot;
      context.zwaveNodeMetadata = METADATA_ZWAVE_NODE;
      context.zwaveEndpointMetadata = METADATA_ZWAVE_ENDPOINT;

      for (var plugin of this._wutwotPluginEnumerator.plugins) {
        context[plugin.id] = plugin;
      }
    };
    reset(this._replServer.context);
    this._replServer.on("exit", async () => {
      await this._app.shutdown();
      process.exit(0);
    });
    this._replServer.on("reset", reset);
  }
}
