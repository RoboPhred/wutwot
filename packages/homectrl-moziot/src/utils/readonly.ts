import { DeepImmutable } from "../types";

export function makeReadOnly<T>(obj: T): Readonly<T> {
  return Object.freeze(Object.seal(obj));
}

export function makeReadOnlyDeep<T>(obj: T): DeepImmutable<T> {
  makeReadOnly(obj);
  for (const prop in Object.getOwnPropertyNames(obj)) {
    makeReadOnlyDeep(obj[prop as keyof T]);
  }
  return obj as any;
}
