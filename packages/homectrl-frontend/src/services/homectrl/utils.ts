import { findKey } from "lodash";
import { Thing } from "./types";

export function getPropertyIdByType(thing: Thing, type: string): string | null {
  return findKey(thing.properties, x => x["@type"] === type) || null;
}
