import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

export const LocalSemanticTypesManager: Identifier<LocalSemanticTypesManager> = createSymbol(
  "LocalSemanticTypeManager",
);
export interface LocalSemanticTypesManager {
  addType(type: string): void;
  getTypes(): string[];
}
