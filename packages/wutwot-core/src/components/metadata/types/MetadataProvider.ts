import { MetadataIdentifier } from "./MetadataIdentifier";

export interface MetadataProvider {
  getMetadataKeys(): MetadataIdentifier<unknown>[];
  getMetadata<T>(identifier: MetadataIdentifier<T>): T | undefined;
}
