import { makeReadOnly } from "./readonly";

/**
 * Creates a proxy on an object exposing whitelisted properties.
 * @param obj The object to proxy.
 * @param whitelist An array of keys to expose
 * @param enumerable If not false, expose all whitelisted properties
 *  as enumerable properties,
 *  even if the object has no descriptor for the property.
 *  This can be used to create enumerable versions of properties defined
 *  on a class prototype.
 */
export function createWhitelistProxy<T extends object, K extends keyof T>(
  obj: T,
  whitelist: K[],
  enumerable = true
): Pick<T, K> {
  // Produce a dummy target containing the keys we want.
  //  This allows us to produce nonconfigurable properties in the proxy
  //  for non-own properties of obj.
  // The proxy enforces a few relations to target:
  //  - If target does not have a property or has a { configurable: true } prop,
  //    the descriptor must return configurable: true
  //  - If the target has a { configurable: false } prop,
  //    the proxy must return an identical descriptor.
  //  - If the target has a non-writable non-configurable prop,
  //    the proxy must always return the target's property value
  // All these rules combine to make me sad, and also to
  //  prevent us making a true read-only view into non-readonly data.
  const target = {} as any;
  for (const key of whitelist) {
    Object.defineProperty(target, key, {
      configurable: false,
      enumerable,
      // We have to mark it as writable
      //  We will stop writes with the proxy.
      writable: true
    });
  }
  Object.seal(target);

  const handler: ProxyHandler<T> = {
    // Other hooks are left as default, and will function as readonly
    //  due to the readonly nature of our target.
    isExtensible() {
      return false;
    },
    has(target, p) {
      return whitelist.includes(p as any);
    },
    get(target, p) {
      if (!whitelist.includes(p as any)) {
        return undefined;
      }
      // Fetch the value from the obj.
      //  target is just a property mock without values.
      return (obj as any)[p];
    },
    set(target, p, value) {
      throw new TypeError(
        `Cannot write property ${String(
          p
        )}; Proxy is a read-only view into the target.`
      );
    },
    ownKeys() {
      return [...whitelist];
    }
  };

  return new Proxy(target, handler);
}
