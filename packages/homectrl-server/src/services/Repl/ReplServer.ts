import repl from "repl";

import { injectable, inject } from "microinject";

import { Entrypoint } from "../../contracts";
import { MozIot } from "homectrl-moziot";
import { ZWavePlugin } from "homectrl-plugin-zwave";

@injectable(Entrypoint)
export class ReplServer implements Entrypoint {
  private _replServer: repl.REPLServer | undefined;

  constructor(
    @inject(MozIot) private _moziot: MozIot,
    @inject(ZWavePlugin) private _zwave: ZWavePlugin
  ) {}

  start() {
    if (this._replServer) {
      return;
    }

    if (!process.stdin.isTTY) {
      return;
    }

    this._replServer = repl.start({
      prompt: ">"
    });
    const reset = (context: any) => {
      context.moziot = this._moziot;
      context.zwave = this._zwave;
    };
    reset(this._replServer.context);
    this._replServer.on("exit", () => {
      process.exit();
    });
    this._replServer.on("reset", reset);
  }
}
