const URN_PREFIX = "https://github.com/robophred/wutwot#model:";

function createSymbol(...name: (string | string[])[]): symbol {
  let flatName = ([] as string[]).concat(...name);
  return Symbol.for(`${URN_PREFIX}${flatName.join(":")}`);
}
export default createSymbol;
