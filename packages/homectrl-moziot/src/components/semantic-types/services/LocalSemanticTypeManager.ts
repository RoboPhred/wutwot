import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

export const LocalSemanticTypeManager: Identifier<LocalSemanticTypeManager> = createSymbol(
  "LocalSemanticTypeManager"
);
export interface LocalSemanticTypeManager {
  addType(type: string): void;
  getTypes(): string[];
}
