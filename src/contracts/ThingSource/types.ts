export interface ThingDef {
  readonly id: string;
  readonly type: string;
  readonly defaultName?: string;
  readonly defaultDescription?: string;
}
export namespace ThingDef {
  export function equals(a: ThingDef, b: ThingDef): boolean {
    return a.id === b.id && a.type === b.type;
  }
  export function isSameType(a: ThingDef, b: ThingDef): boolean {
    return a.type === b.type;
  }
}
