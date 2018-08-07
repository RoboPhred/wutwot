import repl from "repl";

import { injectable, inject } from "microinject";

import { autobind } from "core-decorators";

import { Entrypoint } from "../../contracts";

import { TestAdapter } from "../TestAdapter";
import { ThingDef } from "../MozIOT";

@injectable(Entrypoint)
export class ReplServer implements Entrypoint {
  private _replServer: repl.REPLServer | undefined;

  constructor(@inject(TestAdapter) private _testAdapter: TestAdapter) {}

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

    this._replServer.defineCommand("add-test-thing", this._addTestThing);
    this._replServer.defineCommand("remove-test-thing", this._removeTestThing);
  }

  @autobind()
  private _addTestThing(arg: string) {
    arg = arg.trim();
    let thingDef: ThingDef | undefined;
    if (arg.length > 0) {
      try {
        thingDef = JSON.parse(arg);
      } catch (e) {
        throw new repl.Recoverable(e);
      }
    }
    this._testAdapter.addTestThing(thingDef);
  }

  @autobind()
  private _removeTestThing(id: string) {
    this._testAdapter.removeTestThing(id.length > 0 ? id : undefined);
  }
}
