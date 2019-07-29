import repl from "repl";

import { injectable, inject } from "microinject";

import { MozIot } from "homectrl-moziot";
import { ZWave } from "homectrl-plugin-zwave";

import { Entrypoint } from "../contracts";

@injectable(Entrypoint)
export class ReplServer implements Entrypoint {
  private _replServer: repl.REPLServer | undefined;

  constructor(
    @inject(MozIot) private _mozIot: MozIot,
    @inject(ZWave) private _zwave: ZWave
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
      context.mozIot = this._mozIot;
      context.zwave = this._zwave;
    };
    reset(this._replServer.context);
    this._replServer.on("reset", reset);
  }
}
