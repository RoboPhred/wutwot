import { InvalidIDError } from "./errors";

const ID_FRAGMENT_SEPERATOR = "::";

export function validateCompoundIdFragment(fragment: string) {
  if (fragment.includes(ID_FRAGMENT_SEPERATOR)) {
    throw new InvalidIDError(`ID cannot contain '${ID_FRAGMENT_SEPERATOR}'.`);
  }
}

export function makeCompoundId(...fragments: string[]): string {
  fragments.forEach(validateCompoundIdFragment);
  return fragments.join(ID_FRAGMENT_SEPERATOR);
}
