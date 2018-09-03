import { injectable, singleton, provides } from "microinject";
import { ThingTypesService } from "../ThingTypesService";

@injectable()
@singleton()
@provides(ThingTypesService)
export class ThingTypesServiceImpl implements ThingTypesService {
  private _capabilities = new Map<string, Set<string>>();

  addType(thingId: string, type: string): void {
    let caps = this._capabilities.get(thingId);
    if (caps == null) {
      caps = new Set<string>();
      this._capabilities.set(thingId, caps);
    }
    caps.add(type);
  }

  getTypes(thingId: string): string[] {
    return Array.from(this._capabilities.get(thingId) || []);
  }
}
