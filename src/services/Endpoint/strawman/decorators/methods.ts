function createMethodDecorator(
  method: string
): (path?: string) => MethodDecorator {
  return function(path?: string) {
    return function<T>(
      target: any,
      propertyKey: string | symbol,
      descriptor: TypedPropertyDescriptor<T>
    ) {};
  };
}

export const get = createMethodDecorator("get");
export const head = createMethodDecorator("head");
export const post = createMethodDecorator("post");
export const put = createMethodDecorator("put");
export const del = createMethodDecorator("delete");
export const opts = createMethodDecorator("options");
export const trace = createMethodDecorator("trace");
export const patch = createMethodDecorator("patch");
