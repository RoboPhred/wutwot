import { injectable, provides } from "microinject";

import { asThingScope } from "../../things";

import { LocalSemanticTypesManager } from "../services/LocalSemanticTypesManager";

@injectable()
@asThingScope()
@provides(LocalSemanticTypesManager)
export class LocalSemanticTypesManagerImpl
  implements LocalSemanticTypesManager {
  private _types = new Set<string>();

  addType(type: string): void {
    this._types.add(type);
  }

  getTypes(): string[] {
    return Array.from(this._types);
  }
}
