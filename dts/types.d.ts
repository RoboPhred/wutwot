export declare type ReadonlyRecord<K extends string | number | symbol, V> = Readonly<Record<K, V>>;
export declare type MaybeArray<T> = T | T[];
/**
 * Deep readonly / immutability from https://github.com/Microsoft/TypeScript/issues/13923
 */
export declare type Primitive = undefined | null | boolean | string | number | Function;
export declare type Immutable<T> = T extends Primitive ? T : T extends Array<infer U> ? ReadonlyArray<U> : T extends Map<infer K, infer V> ? ReadonlyMap<K, V> : Readonly<T>;
export declare type DeepImmutable<T> = T extends Primitive ? T : T extends Array<infer U> ? DeepImmutableArray<U> : T extends Map<infer K, infer V> ? DeepImmutableMap<K, V> : DeepImmutableObject<T>;
export interface DeepImmutableArray<T> extends ReadonlyArray<DeepImmutable<T>> {
}
export interface DeepImmutableMap<K, V> extends ReadonlyMap<DeepImmutable<K>, DeepImmutable<V>> {
}
export declare type DeepImmutableObject<T> = {
    readonly [K in keyof T]: DeepImmutable<T[K]>;
};
