const URN_PREFIX = "https://github.com/robophred/homectrl#plugin-zwave:";

function createSymbol(...name: (string | string[])[]): symbol {
  let flatName = ([] as string[]).concat(...name);
  return Symbol.for(`${URN_PREFIX}${flatName.join(":")}`);
}
export default createSymbol;
