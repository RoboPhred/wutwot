export class IDMapper {
  private _ids = new Set<string>();
  private _nextRollingPostfix = 1;

  createId(root: string): string {
    let id = root;
    while (this._ids.has(id)) {
      id = `${root}-${this._nextRollingPostfix++}`;
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
