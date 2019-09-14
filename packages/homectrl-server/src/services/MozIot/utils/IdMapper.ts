export class IdMapper {
  private _ids = new Set<string>();
  private _nextRollingPostfix = 1;

  createId(name: string): string {
    name = cleanName(name);
    let id = name;
    if (id == "") {
      throw new Error("Name is required.");
    }

    while (this._ids.has(id)) {
      id = `${name}-${this._nextRollingPostfix++}`;
    }
    this._ids.add(id);
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
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}