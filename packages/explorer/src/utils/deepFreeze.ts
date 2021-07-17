export function deepFreeze<T>(obj: T): Readonly<T> {
  if (Array.isArray(obj)) {
    Object.freeze(obj);
    obj.forEach(deepFreeze);
  } else if (obj && typeof obj === "object") {
    Object.freeze(obj);
    Object.keys(obj).forEach((key) => deepFreeze((obj as any)[key]));
  }
  return obj;
}
