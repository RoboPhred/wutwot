import { MetadataIdentifier } from "./MetadataIdentifier";
import { MetadataProvider } from "./MetadataProvider";

export interface MetadataContainer extends MetadataProvider {
  addMetadata<T>(identifier: MetadataIdentifier<T>, value: T): this;
}
