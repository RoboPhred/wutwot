import { Scaler } from "../types";

/**
 * Deep readonly / immutability from https://github.com/Microsoft/TypeScript/issues/13923
 */
export type Immutable<T> = T extends Scaler | Function
  ? T
  : T extends Array<infer U>
  ? ReadonlyArray<U>
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<K, V>
  : Readonly<T>;

export type DeepImmutable<T> = T extends Scaler | Function
  ? T
  : T extends Array<infer U>
  ? DeepImmutableArray<U>
  : T extends Map<infer K, infer V>
  ? DeepImmutableMap<K, V>
  : DeepImmutableObject<T>;

export interface DeepImmutableArray<T>
  extends ReadonlyArray<DeepImmutable<T>> {}
export interface DeepImmutableMap<K, V>
  extends ReadonlyMap<DeepImmutable<K>, DeepImmutable<V>> {}
export type DeepImmutableObject<T> = {
  readonly [K in keyof T]: DeepImmutable<T[K]>;
};
