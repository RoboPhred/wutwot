import { ThingSource } from "./types";

const LOCALSTORAGE_KEY = "thing-sources";

export function getPersistedSources(): ThingSource[] {
  const str = localStorage.getItem(LOCALSTORAGE_KEY);
  if (!str) {
    return [];
  }

  try {
    return JSON.parse(str);
  } catch {
    return [];
  }
}

export function setPersistedSources(sources: ThingSource[]) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(sources));
}
