import { MetadataIdentifier } from "@wutwot/core";
import { Endpoint, ZWaveNode } from "zwave-js";

import createSymbol from "./create-symbol";

export const ZWaveNodeMetadata: MetadataIdentifier<ZWaveNode> =
  createSymbol("metadata/ZWaveNode");

export const ZWaveEndpointMetadata: MetadataIdentifier<Endpoint> = createSymbol(
  "metadata/ZWaveEndpoint",
);
