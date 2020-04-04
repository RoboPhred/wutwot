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
  whitelist: readonly K[],
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
  // All these rules combine to prevent us making an object that
  //  describes itself as read-only yet provides mutable data.
  //  This is probably because the javascript engine performs
  //  extra optimizations around readonly data.
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
      return isWhitelistedKey(p, whitelist);
    },
    get(target, p) {
      if (!isWhitelistedKey(p, whitelist)) {
        return undefined;
      }
      // Fetch the value from the obj.
      return obj[p];
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

function isWhitelistedKey<K extends string | number | symbol>(
  key: string | number | symbol,
  whitelist: readonly K[]
): key is K {
  return whitelist.includes(key as any);
}
