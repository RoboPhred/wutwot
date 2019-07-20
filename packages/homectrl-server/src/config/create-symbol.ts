import createParentSymbol from "../create-symbol";

export function createSymbol(...name: string[]) {
  return createParentSymbol("config", ...name);
}
