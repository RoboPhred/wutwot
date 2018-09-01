import { injectable, provides } from "microinject";
import { IdMapper } from "../IdMapper";

@injectable()
@provides(IdMapper)
export class IdMapperImpl implements IdMapper {
  private _ids = new Set<string>();
  private _nextRollingPostfix = 1;

  createId(name: string): string {
    let id = cleanName(name);
    while (this._ids.has(id)) {
      id = `${name}-${this._nextRollingPostfix++}`;
    }
    return id;
  }

  retireId(id: string): boolean {
    return this._ids.delete(id);
  }

  [Symbol.iterator]() {
    return this._ids[Symbol.iterator]();
  }

  has(id: string): boolean {
    return this._ids.has(id);
  }
}

function cleanName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}
