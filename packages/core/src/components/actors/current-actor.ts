import { AsyncLocalStorage } from "async_hooks";

import { Actor } from "./types";

const currentActorStorage = new AsyncLocalStorage<Actor>();

export function getCurrentActor(): Actor | undefined {
  return currentActorStorage.getStore();
}

export function withActor<T>(actor: Actor, handler: (actor: Actor) => T): T {
  // Note that the nodejs docs are wrong here.
  // They claim the storage will not be available in async operations spawned from handler.
  // However, their examples show otherwise, and that would entirely defeat the point of AsyncLocalStorage.
  return currentActorStorage.run(actor, () => handler(actor));
}
