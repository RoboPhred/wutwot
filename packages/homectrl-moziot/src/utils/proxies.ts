const sealedDummy = Object.seal({});

export function createWhitelistProxy<T extends object, K extends keyof T>(
  obj: T,
  whitelist: K[]
): Pick<T, K> {
  const handler: ProxyHandler<T> = {
    isExtensible() {
      return false;
    },
    getOwnPropertyDescriptor(target, p) {
      if (whitelist.includes(p as any)) {
        return Object.getOwnPropertyDescriptor(target, p);
      }
      return undefined;
    },
    defineProperty(target, p, attributes) {
      // Deliberately throw the usual error for extending a sealed object.
      return Object.defineProperty(sealedDummy, p, attributes);
    },
    has(target, p) {
      return whitelist.includes(p as any);
    },
    get(target, p) {
      if (!whitelist.includes(p as any)) {
        return undefined;
      }
      return (target as any)[p];
    },
    set(target, p, value) {
      // Deliberately throw the usual error for extending a sealed object.
      return ((sealedDummy as any)[p] = value);
    },
    deleteProperty(target, p) {
      // Deliberately throw the usual error for extending a sealed object.
      return delete (sealedDummy as any)[p];
    },
    ownKeys() {
      return [...whitelist];
    }
  };

  return new Proxy(obj, handler);
}
