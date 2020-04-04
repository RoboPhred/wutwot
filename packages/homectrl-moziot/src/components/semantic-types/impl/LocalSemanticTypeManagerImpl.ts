import { injectable, provides } from "microinject";

import { asThingScope } from "../../things";

import { LocalSemanticTypeManager } from "../services/LocalSemanticTypeManager";

@injectable()
@asThingScope()
@provides(LocalSemanticTypeManager)
export class LocalSemanticTypeManagerImpl implements LocalSemanticTypeManager {
  private _types = new Set<string>();

  addType(type: string): void {
    this._types.add(type);
  }

  getTypes(): string[] {
    return Array.from(this._types);
  }
}
