import { Identifier } from "microinject";
import createSymbol from "../create-symbol";

export const ModelPropertyApplicator: Identifier<ModelPropertyApplicator> =
  createSymbol("ModelPropertyApplicator");
export interface ModelPropertyApplicator {
  onPostInitialize(): void;
}
