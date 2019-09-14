import createParentSymbol from "./create-symbol";

function createSymbol(...name: (string | string[])[]): symbol {
  return createParentSymbol("ZWave", ...name);
}
export default createSymbol;
