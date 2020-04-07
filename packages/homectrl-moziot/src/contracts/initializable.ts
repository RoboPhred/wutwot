import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

/**
 * Identifies an initializable component.
 *
 * Initializable components are initialized after all services are registered.
 */
export const Initializable: Identifier<Initializable> = createSymbol(
  "Initializable",
);

/**
 * Defines an initializable component.
 *
 * Initializable components are initialized after all services are registered.
 */
export interface Initializable {
  /**
   * A callback called after all services are registered.
   */
  onInitialize(): void;
}
