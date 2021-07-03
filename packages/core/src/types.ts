export type ReadonlyRecord<K extends string | number | symbol, V> = Readonly<
  Record<K, V>
>;
export type ArrayItem<T> = T extends (infer A)[] ? A : never;

export type Scaler = undefined | null | boolean | string | number;
export type KeyCompatibleMap<K extends string | number | symbol, V> = Map<K, V>;
export type KeyCompatibleReadonlyMap<
  K extends string | number | symbol,
  V,
> = ReadonlyMap<K, V>;
export type ToJSON<T> = T extends Scaler
  ? T
  : T extends Array<infer U>
  ? ToJSONArray<U>
  : T extends Function
  ? never
  : T extends KeyCompatibleMap<infer K, infer V>
  ? Record<K, ToJSON<V>>
  : T extends KeyCompatibleReadonlyMap<infer K, infer V>
  ? Record<K, ToJSON<V>>
  : ToJSONObject<T>;
export interface ToJSONArray<T> extends Array<ToJSON<T>> {}
export type ToJSONObject<T> = {
  [P in keyof T as T[P] extends Function ? never : P]: ToJSON<T[P]>;
};
export interface JSONAble<T = any> {
  toJSON(): ToJSON<T>;
}

export function isJSONAble(obj: any): obj is JSONAble {
  return typeof (obj as any).toJSON === "function";
}
