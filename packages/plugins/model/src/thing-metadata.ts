import { MetadataIdentifier } from "@wutwot/core";
import createSymbol from "./create-symbol";

export const IsSelfNamedThingMetadata: MetadataIdentifier<boolean> =
  createSymbol("IsSelfNamedThing");
