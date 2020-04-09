import createSymbol from "./create-symbol";
import { createMetadataIdentifier } from "homectrl-moziot";

export const METADATA_ZWAVE_NODE = createMetadataIdentifier(
  createSymbol("metadata/ZWaveNode"),
);

export const METADATA_ZWAVE_ENDPOINT = createMetadataIdentifier(
  createSymbol("metadata/ZWaveEndpoint"),
);
