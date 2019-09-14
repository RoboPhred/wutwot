import createParentSymbol from "../../create-symbol";

function createSymbol(...name: (string | string[])[]): symbol {
  return createParentSymbol("MozIot", ...name);
}
export default createSymbol;
