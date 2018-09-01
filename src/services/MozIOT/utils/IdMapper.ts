import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

export const IdMapper: Identifier<IdMapper> = createSymbol("IdMapper");
export interface IdMapper {
  createId(name: string): string;
  retireId(id: string): boolean;
  [Symbol.iterator](): IterableIterator<string>;
  has(id: string): boolean;
}
