import createParentSymbol from "../../create-symbol";

export default function createSymbol(...name: (string | string[])[]): symbol {
  return createParentSymbol("ZWavePlugin", ...name);
}
