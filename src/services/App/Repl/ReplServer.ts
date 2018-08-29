import repl from "repl";

import { injectable, inject } from "microinject";

import { Entrypoint } from "../contracts";

import { MozIot } from "../../MozIot";

@injectable(Entrypoint)
export class ReplServer implements Entrypoint {
  private _replServer: repl.REPLServer | undefined;

  constructor(@inject(MozIot) private _mozIoT: MozIot) {}

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
      context.thingManager = this._mozIoT;
    };
    reset(this._replServer.context);
    this._replServer.on("reset", reset);
  }
}
