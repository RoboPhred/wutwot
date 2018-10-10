import repl from "repl";

import { injectable, inject } from "microinject";

import { MozIot } from "homectrl-moziot";

import { Entrypoint } from "../contracts";

@injectable(Entrypoint)
export class ReplServer implements Entrypoint {
  private _replServer: repl.REPLServer | undefined;

  constructor(@inject(MozIot) private _mozIot: MozIot) {}

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
    };
    reset(this._replServer.context);
    this._replServer.on("reset", reset);
  }
}
