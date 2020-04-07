import { MetadataIdentifier } from "./types";

export function createMetadataIdentifier<T>(
  identity: string | symbol
): MetadataIdentifier<T> {
  return identity as any;
}
