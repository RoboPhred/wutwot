import { Identifier } from "microinject";
import createSymbol from "../create-symbol";

/**
 * Identifies a component wishing to be notified on shutdown.
 */
export const Shutdownable: Identifier<Shutdownable> = createSymbol(
  "Shutdownable",
);

/**
 * Defines a component wishing to be notified on shutdown.
 */
export interface Shutdownable {
  /**
   * Callback to be called when the program is shutting down.
   * @returns An optional promise representing the shutdown process this component is performing.
   */
  onShutdown(): Promise<void> | undefined;
}
