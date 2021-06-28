export interface Deferred<T> {
  readonly promise: Promise<T>;
  resolve(value: T): void;
  reject(err: Error): void;
}

export function createDeferred<T>(): Deferred<T> {
  const d = {} as any;
  d.promise = new Promise<T>((accept, reject) => {
    d.resolve = accept;
    d.reject = reject;
  });
  return d;
}
