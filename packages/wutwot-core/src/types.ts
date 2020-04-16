export type ReadonlyRecord<K extends string | number | symbol, V> = Readonly<
  Record<K, V>
>;
export type ArrayItem<T> = T extends (infer A)[] ? A : never;

export type Scaler = undefined | null | boolean | string | number;
export type ToJSON<T> = T extends Scaler
  ? T
  : T extends Array<infer U>
  ? ToJSONArray<U>
  : T extends Function
  ? never
  : ToJSONObject<Pick<T, JSONKeys<T>>>;
export interface ToJSONArray<T> extends Array<ToJSON<T>> {}
export type ToJSONObject<T> = {
  [K in keyof T]: ToJSON<T[K]>;
};
export type JSONKeys<T> = {
  [P in keyof T]: T[P] extends Scaler ? P : never;
}[keyof T];
